using Domain_Layer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service_Layer.ICustomService;
using SharedUtilities;

namespace TenantManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CouponController : ControllerBase
    {

        private readonly ICouponServices<Coupon> _couponServices;

        public CouponController(ICouponServices<Coupon> couponServices)
        {
            _couponServices = couponServices;
        }

        [HttpGet("GetBy/{id}", Name = nameof(GetCouponById))]
        public IActionResult GetCouponById(long id)
        {
            var coupon = _couponServices.Get(id);

            if (coupon == null)
            {
                return NotFound();
            }

            return Ok(coupon);
        }

        [HttpGet("{supabaseUserId}")]
        public IActionResult GetAll(string supabaseUserId)
        {
            var coupons = _couponServices.GetAll().Where(c => c.SupabaseUserId == supabaseUserId);

            if (coupons == null || coupons.Count() == 0)
            {
                return NotFound();
            }

            return Ok(coupons);
        }
        [HttpGet("GetAll")]
        public IActionResult GetAllCoupons()
        {
            var coupons = _couponServices.GetAll();

            if (coupons == null || coupons.Count() == 0)
            {
                return NotFound("No coupons found");
            }

            return Ok(coupons);
        }


        [HttpPost("Create")]
        public IActionResult CreateCoupon([FromBody] Coupon createCoupon)
        {
            if (createCoupon != null)
            {
                // Generate multiple coupons based on the quantity
                var coupons = new List<Coupon>();

                for (int i = 0; i < createCoupon.Quantity; i++)
                {
                    var newCoupon = new Coupon
                    {
                        Id = 0,
                        CouponCode = CouponCodeGenerator.GenerateCouponCode(8),

                        CouponName = createCoupon.CouponName,
                        Description = createCoupon.Description,
                        Discount = createCoupon.Discount,
                        Quantity = createCoupon.Quantity,
                        StartDate = createCoupon.StartDate,
                        EndDate = createCoupon.EndDate,
                        DiscountType = createCoupon.DiscountType,
                        SupabaseUserId = createCoupon.SupabaseUserId,

                    };

                    coupons.Add(newCoupon);
                    _couponServices.insert(newCoupon);
                }

                return CreatedAtRoute(nameof(GetCouponById), new { id = coupons.First().Id }, coupons);
            }

            return BadRequest("Invalid coupon data");
        }


        [HttpPut("Update")]
        public IActionResult UpdateCoupon([FromBody] Coupon updatedCoupon)
        {
            if (updatedCoupon != null)
            {
                // Get the existing coupon
                var existingCoupon = _couponServices.Get(updatedCoupon.Id);

                if (existingCoupon == null)
                {
                    return NotFound("Coupon not found");
                }

                // Update the existing coupon properties
                existingCoupon.CouponName = updatedCoupon.CouponName;
                existingCoupon.Description = updatedCoupon.Description;
                existingCoupon.Discount = updatedCoupon.Discount;
                existingCoupon.StartDate = updatedCoupon.StartDate;
                existingCoupon.EndDate = updatedCoupon.EndDate;
                existingCoupon.DiscountType = updatedCoupon.DiscountType;
                existingCoupon.SupabaseUserId = updatedCoupon.SupabaseUserId;
                // Check if the quantity is being updated
                if (existingCoupon.Quantity != updatedCoupon.Quantity)
                {
                    // Generate additional coupons based on the updated quantity
                    var additionalCoupons = new List<Coupon>();

                    for (long i = existingCoupon.Quantity + 1; i <= updatedCoupon.Quantity; i++)
                    {
                        var newCoupon = new Coupon
                        {
                            Id = 0,
                            CouponCode = CouponCodeGenerator.GenerateCouponCode(8),
                            CouponName = updatedCoupon.CouponName,
                            Description = updatedCoupon.Description,
                            Discount = updatedCoupon.Discount,
                            Quantity = updatedCoupon.Quantity,
                            StartDate = updatedCoupon.StartDate,
                            EndDate = updatedCoupon.EndDate,
                            DiscountType = updatedCoupon.DiscountType,
                            SupabaseUserId = updatedCoupon.SupabaseUserId,
                        };

                        additionalCoupons.Add(newCoupon);
                        _couponServices.insert(newCoupon);
                    }
                }


                _couponServices.update(existingCoupon);

                return Ok(existingCoupon);
            }

            return BadRequest("Invalid coupon data");
        }



        [HttpDelete("Delete/{id}")]
        public IActionResult DeleteCoupon(long id)
        {
            var couponToDelete = _couponServices.Get(id);

            if (couponToDelete == null)
            {
                return NotFound("Coupon not found");
            }

            // Update quantity field
            var remainingQuantity = couponToDelete.Quantity - 1;
            if (remainingQuantity >= 0)
            {
                couponToDelete.Quantity = remainingQuantity;
                _couponServices.update(couponToDelete);
                _couponServices.delete(couponToDelete);

                // Return the updated coupon
                return Ok(couponToDelete);
            }
            else
            {
                return BadRequest("Invalid quantity");
            }
        }


    }
}