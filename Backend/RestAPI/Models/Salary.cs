using System;
using System.Collections.Generic;

namespace RestAPI.Models
{
    public partial class Salary
    {
        public int EmpId { get; set; }
        public decimal? SalaryMonth { get; set; }
        public int DayOff { get; set; }
        public decimal? Allowance { get; set; }

        public Employee Emp { get; set; }
    }
}
