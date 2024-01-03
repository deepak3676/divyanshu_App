using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Layer.Models
{
    public class Attendances
    {
        [Key]
        public int AttendanceId { get; set; }
        public int id { get; set; }
        public DateTime LoginTime { get; set; }
        public DateTime LogoutTime { get; set; }
        public TimeSpan? Hours { get; set; }

    }
}
