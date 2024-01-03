using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Layer.Models
{
    public class SalaryRecord 
    {


        [Key]
        public int SalaryId { get; set; }

        [ForeignKey("EmployeeId")]
        public virtual Management Management { get; set; }
        public int EmployeeId { get; set; }
        public string SalaryMonth { get; set; }
        public int Salary { get; set; }
        public decimal Leaves { get; set; }
        public int Deductions { get; set; }
        public int NetPay { get; set; }


    }
}
