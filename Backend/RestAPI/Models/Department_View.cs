using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Models
{
    public class Department_View
    {
        public int DeptId { get; set; }
        public string DeptName { get; set; }
        public int DeptManagerId { get; set; }
        public string DeptManagerName { get; set; }
    }
}
