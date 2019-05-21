using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Models
{
    public class Salary_View
    {
        public int EmployeeID { get; set; }
        public string EmployeeName { get; set; }
        public decimal? SalaryMonth { get; set; }
        public int DayOff { get; set; }
        public decimal? Allowance { get; set; }
    }
}
