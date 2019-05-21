using System;
using System.Collections.Generic;

namespace RestAPI.Models
{
    public partial class WorkOn
    {
        public int EmpId { get; set; }
        public int DeptId { get; set; }
        public string Position { get; set; }

        public Department Dept { get; set; }
        public Employee Emp { get; set; }
    }
}
