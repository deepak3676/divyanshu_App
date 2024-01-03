using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Layer.Models
{
    public class projectModel
    {
        [Key]
        public int ProjectId
        {
            get;
            set;
        }
        public string projectName
        {
            get;
            set;
        }
        public string Client
        {
            get;
            set;
        }
        public DateTime StartDate
        {
            get;
            set;
        }
        public DateTime EndDate
        {
            get;
            set;
        }
        public string Country
        {
            get;
            set;
        }
        public double Budget
        {
            get;
            set;
        }
        public string Status
        {
            get;
            set;
        }
        public string tenantName { get; set; }
    }
}
