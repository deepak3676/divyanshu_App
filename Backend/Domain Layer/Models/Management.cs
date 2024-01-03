using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Layer.Models
{
    public class Management
    {
        public int id
        {
            get;
            set;
        }
        public string email
        {
            get;
            set;
        }
        public string department
        {
            get;
            set;
        }
        public string firstName
        {
            get;
            set;
        }
        public string lastName
        {
            get;
            set;
        }
        public string password
        {
            get;
            set;
        }
        public string tenantName
        {
            get;
            set;
        }

    }
}
