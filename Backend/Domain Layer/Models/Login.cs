using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Layer.Models
{

    [Keyless]
    public class Login
    {
        [ForeignKey("id")]
        public Management Managements { get; set; }
        public int id { get; set; } // Add this property 
        public string? email { get; set; }
        public string? password { get; set; }
    }
}
