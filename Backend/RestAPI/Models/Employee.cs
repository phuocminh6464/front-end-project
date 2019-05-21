using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RestAPI.Models
{
    public partial class Employee
    {
        public Employee()
        {
            WorkOn = new HashSet<WorkOn>();
        }

   
        public int EmpId { get; set; }
        public string EmpName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Sex { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }

        public Salary Salary { get; set; }
        public ICollection<WorkOn> WorkOn { get; set; }
    }
}
