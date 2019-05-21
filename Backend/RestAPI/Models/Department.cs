using System;
using System.Collections.Generic;

namespace RestAPI.Models
{
    public partial class Department
    {
        public Department()
        {
            WorkOn = new HashSet<WorkOn>();
        }

        public int DeptId { get; set; }
        public string DeptName { get; set; }
        public int DeptManagerId { get; set; }

        public ICollection<WorkOn> WorkOn { get; set; }
    }
}
