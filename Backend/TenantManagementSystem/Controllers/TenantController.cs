using Domain_Layer.Application;
using Domain_Layer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service_Layer.ICustomService;

namespace TenantManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TenantController : ControllerBase
    {
        private readonly ICustomService<Management> _customService;
        private readonly ApplicationDbContext _applicationDbContext;
        public TenantController(ICustomService<Management> customService, ApplicationDbContext applicationDbContext)
        {
            _customService = customService;
            _applicationDbContext = applicationDbContext;
        }
        [HttpGet(nameof(GetTenantById))]
        public IActionResult GetTenantById(int Id)
        {
            var obj = _customService.Get(Id);
            if (obj == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(obj);
            }
        }
        [HttpGet(nameof(GetUsersByTenantName))]
        public IActionResult GetUsersByTenantName(string tenantName)
        {
            try
            {
                var users = _customService.GetUsersByTenantName(tenantName);

                if (users == null || !users.Any())
                {
                    if (string.IsNullOrEmpty(tenantName))
                    {
                        // Handle the case where tenantName is empty and return an appropriate response.
                        // For example, you might want to return an empty list or a specific message.
                        return Ok(new List<string>()); // Or return NotFound("No data found for empty tenantName");
                    }
                    else
                    {
                        return NotFound($"No users found for the specified tenantName: {tenantName}");
                    }
                }
                else
                {
                    return Ok(users);
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }
        [HttpGet(nameof(GetAllTenant))]
        public IActionResult GetAllTenant()
        {
            var obj = _customService.GetAll();
            if (obj == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(obj);
            }
        }
        [HttpPost(nameof(CreateTenant))]
        public IActionResult CreateTenant([FromBody] Management student)
        {
            if (student != null)
            {
                _customService.Insert(student);
                return Ok("Created Successfully");
            }
            else
            {
                return BadRequest("Something went wrong");
            }
        }
        [HttpPost(nameof(UpdateTenant))]
        public IActionResult UpdateTenant([FromBody] ManagementUpdateDto updateDto)
        {
            if (updateDto != null)
            {
                var existingTenant = _customService.Get(updateDto.Id);

                if (existingTenant == null)
                {
                    return NotFound($"Tenant with ID {updateDto.Id} not found");
                }

                // Update only the properties that are provided in the DTO
                existingTenant.email = updateDto.Email;
                existingTenant.department = updateDto.Department;
                existingTenant.firstName = updateDto.FirstName;
                existingTenant.lastName = updateDto.LastName;

                _customService.Update(existingTenant);

                return Ok("Updated Successfully");
            }
            else
            {
                return BadRequest("Invalid data provided");
            }
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(string id)
        {
            var success = _customService.Delete(id);
            if (success)
            {
                return Ok("Deleted Successfully");
            }
            else
            {
                return BadRequest("Something went wrong");
            }
        }
    }
}
