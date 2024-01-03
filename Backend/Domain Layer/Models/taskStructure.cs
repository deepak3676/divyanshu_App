using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Layer.Models
{
    public class taskStructure
    {

        [Key]
        public int Id { get; set; }
        public string taskName { get; set; }
        public string taskDescription { get; set; }
        public DateTime taskStartTime { get; set; }
        public DateTime taskEndTime { get; set; }
        public string userName { get; set; }
        public string tenantName { get; set; }
    }
}
