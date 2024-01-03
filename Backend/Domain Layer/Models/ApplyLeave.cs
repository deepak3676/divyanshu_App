using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Layer.Models
{
    public class ApplyLeave
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public string? ManagerName { get; set; }

        public string? EmployeeName { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string? LeaveType { get; set; }

        public string? Reason { get; set; }

        public string? status { get; set; }

        public string? managercomment { get; set; }
    }
}
