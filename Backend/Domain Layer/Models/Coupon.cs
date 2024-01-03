using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Layer.Models
{
    public class Coupon
    {
        [Key]
        public long Id { get; set; }

        [Required(ErrorMessage = "CouponCode is required")]
        [MaxLength(255)]
        public string CouponCode { get; set; }

        public string CouponName { get; set; }
        public string Description { get; set; }
        public decimal Discount { get; set; }
        public long Quantity { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string DiscountType { get; set; }

        public string SupabaseUserId { get; set; }
    }
}
