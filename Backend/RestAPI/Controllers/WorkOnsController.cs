using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using RestAPI.Models;

namespace RestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkOnsController : ControllerBase
    {
        private readonly DeptManagementContext _context;

        public WorkOnsController(DeptManagementContext context)
        {
            _context = context;
        }

        // GET: api/WorkOns
        /*[HttpGet]
        public IEnumerable<WorkOn> GetWorkOn()
        {
            return _context.WorkOn;
        }*/

        [HttpGet]
        public IEnumerable<WorkOn_View> GetAllWithName()
        {
            IEnumerable<WorkOn_View> model = null;
            model = (from w in _context.WorkOn
                     join e in _context.Employee on w.EmpId equals e.EmpId
                     join d in _context.Department on w.DeptId equals d.DeptId
                     select new WorkOn_View {
                         EmpId = e.EmpId,
                         EmpName = e.EmpName,
                         DeptId = w.DeptId,
                         DeptName = d.DeptName,
                         Position = w.Position
                        });
            return model;
        }
        

        // GET: api/WorkOns/5
        [HttpGet("~/api/workons/emp/{id}")]

        public IEnumerable<WorkOn> SearchWorkOnByEmpID([FromRoute] int id)
        {
            return _context.WorkOn.Where(m => m.EmpId == id);
        }

        // GET: api/WorkOns/5
        [HttpGet("~/api/workons/dept/{id}")]

        public IEnumerable<WorkOn> SearchWorkOnByDeptID([FromRoute] int id)
        {
            return _context.WorkOn.Where(m => m.DeptId == id);
        }

        // GET: api/WorkOns/1&5
        [HttpGet("~/api/workons/{empID}&{deptID}")]

        public IActionResult GetPos([FromRoute] int empID, [FromRoute] int deptID)
        {
            //return _context.WorkOn.Where(m => m.DeptId == deptID && m.EmpId == empID);
            var model = (from w in _context.WorkOn
                     join e in _context.Employee on w.EmpId equals e.EmpId
                     join d in _context.Department on w.DeptId equals d.DeptId
                     where d.DeptId == deptID && e.EmpId == empID
                     select new WorkOn_View
                     {
                         EmpId = e.EmpId,
                         EmpName = e.EmpName,
                         DeptId = w.DeptId,
                         DeptName = d.DeptName,
                         Position = w.Position
                     }).FirstOrDefault();
            return Ok(model);
        }

        // PUT: api/WorkOns/1&5
        // Chỉ được update Position 
        [HttpPut("~/api/workons/{empID}&{deptID}")]
        public async Task<IActionResult> UpdateWorkOn([FromRoute] int empID, [FromRoute] int deptID, [FromBody] WorkOn workOn) 
        {        

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (empID != workOn.EmpId || deptID !=workOn.DeptId)
            {
                return BadRequest();
            }

            //var obj = await _context.WorkOn.SingleOrDefaultAsync(pos => pos.EmpId == empID && pos.DeptId == deptID);
            //var find =  _context.WorkOn.Where(pos => pos.EmpId == workOn.EmpId && pos.DeptId == workOn.DeptId);          

            _context.Entry(workOn).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/WorkOns      

        [HttpPost]
        public async Task<IActionResult> AddWorkOn([FromBody] WorkOn workOn)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.WorkOn.Add(workOn);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (WorkOnExists(workOn.EmpId))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("AddWorkOn", new { id = workOn.EmpId }, workOn);
        }


        //delete record which have empID and deptID
        // DELETE: api/WorkOns/1&5
        [HttpDelete("~/api/workons/{empID}&{deptID}")]
        public async Task<IActionResult> DeleteWorkOn([FromRoute] int empID, [FromRoute] int deptID)
        {
            if (empID == 0 || deptID == 0)
            {
                return NotFound();
            }

            var workOn = await _context.WorkOn.SingleOrDefaultAsync(pos => pos.EmpId == empID && pos.DeptId == deptID);

            if (workOn == null)
            {
                return NotFound();
            }

            _context.WorkOn.Remove(workOn); //"Remove" instead of "Delete"
            await _context.SaveChangesAsync();

            return Ok(workOn);
        }

        // DELETE: api/WorkOns/5
        [HttpDelete("~/api/workons/dept/{id}")]
        public async Task<IActionResult> DeleteWorkOnByDeptID([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //find all record equal DeptID
            var workOn = SearchWorkOnByDeptID(id);

            if (workOn == null)
            {
                return NotFound();
            }

            _context.WorkOn.RemoveRange(workOn);

            await _context.SaveChangesAsync();

            return Ok(workOn);
        }

        // DELETE: api/WorkOns/5
        [HttpDelete("~/api/workons/emp/{id}")]
        public async Task<IActionResult> DeleteWorkOnByEmpID([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //find all record equal DeptID
            var workOn = SearchWorkOnByEmpID(id);

            if (workOn == null)
            {
                return NotFound();
            }

            _context.WorkOn.RemoveRange(workOn);

            await _context.SaveChangesAsync();

            return Ok(workOn);
        }

        private bool WorkOnExists(int id)
        {
            return _context.WorkOn.Any(e => e.EmpId == id);
        }
    }
}
 