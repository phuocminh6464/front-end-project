using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestAPI.Models;

namespace RestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalariesController : ControllerBase
    {
        private readonly DeptManagementContext _context;

        public SalariesController(DeptManagementContext context)
        {
            _context = context;
        }

        // GET: api/Salaries
        /*/[HttpGet]
        public IEnumerable<Salary> GetSalary()
        {
            return _context.Salary;
        }*/

        [HttpGet]
        public IEnumerable<Salary_View> GetAllWithName()
        {
            IEnumerable<Salary_View> model = null;
            model = (from e in _context.Employee
                     join s in _context.Salary
                     on e.EmpId equals s.EmpId
                     select new Salary_View
                     {            
                         EmployeeID = s.EmpId,
                         EmployeeName = e.EmpName,                      
                         SalaryMonth = s.SalaryMonth,
                         Allowance = s.Allowance,
                         DayOff = s.DayOff                         
                     });
            return model;
        }

        // GET: api/Salaries/5
        [HttpGet("{id}")]
        public async Task<IActionResult> SearchSalaryByID([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var salary = await _context.Salary.FindAsync(id);

            if (salary == null)
            {
                return NotFound();
            }

            return Ok(salary);
        }

        // PUT: api/Salaries/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSalary([FromRoute] int id, [FromBody] Salary salary)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != salary.EmpId)
            {
                return BadRequest();
            }

            _context.Entry(salary).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalaryExists(id))
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

        // POST: api/Salaries
        [HttpPost]
        public async Task<IActionResult> AddSalary([FromBody] Salary salary)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Salary.Add(salary);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SalaryExists(salary.EmpId))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("AddSalary", new { id = salary.EmpId }, salary);
        }

        // DELETE: api/Salaries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSalary([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var salary = await _context.Salary.FindAsync(id);
            if (salary == null)
            {
                return NotFound();
            }

            _context.Salary.Remove(salary);
            await _context.SaveChangesAsync();

            return Ok(salary);
        }

        private bool SalaryExists(int id)
        {
            return _context.Salary.Any(e => e.EmpId == id);
        }
    }
}