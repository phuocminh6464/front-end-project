using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestAPI.Models;
using RestAPI.Controllers;

namespace RestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly DeptManagementContext _context;

        public DepartmentsController(DeptManagementContext context)
        {
            _context = context;
        }

        // GET: api/Departments
        [HttpGet]
        public IEnumerable<Department_View> GetDepartmentWithName()
        {
            IEnumerable<Department_View> model = null;
            model = (from d in _context.Department
                     join e in _context.Employee on d.DeptManagerId equals e.EmpId
                     select new Department_View
                     {
                         DeptManagerId = e.EmpId,
                         DeptManagerName = e.EmpName,
                         DeptId = d.DeptId,
                         DeptName = d.DeptName
                     });
            return model;
        }

        //[HttpGet]
        //public IEnumerable<Department> GetDepartment()
        //{
        //    return _context.Department;
        //}


        // GET: api/Departments/5
        [HttpGet("{id}")]
        public async Task<IActionResult> SearchDepartmentByID([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var department = await _context.Department.FindAsync(id);

            if (department == null)
            {
                return NotFound();
            }

            return Ok(department);
        }

        // PUT: api/Departments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDepartment([FromRoute] int id, [FromBody] Department department)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != department.DeptId)
            {
                return BadRequest();
            }

            _context.Entry(department).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Departments
        [HttpPost]
        public async Task<IActionResult> AddDepartment([FromBody] Department department)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Department.Add(department);
            await _context.SaveChangesAsync();

            return CreatedAtAction("AddDepartment", new { id = department.DeptId }, department);
        }

        // DELETE: api/Departments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var department = await _context.Department.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }

            var workon = _context.WorkOn.Where(m => m.DeptId == id);

            if (workon == null)
            {
                _context.Department.Remove(department);
            }
            else
            {
                var controller = new WorkOnsController(_context);
                await controller.DeleteWorkOnByDeptID(id);
                _context.Department.Remove(department);
            }

            await _context.SaveChangesAsync();

            return Ok(department);
        }

        private bool DepartmentExists(int id)
        {
            return _context.Department.Any(e => e.DeptId == id);
        }
    }
}