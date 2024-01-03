using Domain_Layer.Application;
using Domain_Layer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Service_Layer.Custom_Service;
using Service_Layer.ICustomService;

namespace TenantManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveManagementSystemController : ControllerBase
    {
        private readonly IApplyLeaveService<ApplyLeave> _Service;
        private readonly ApplicationDbContext _applicationDbContext;

        public LeaveManagementSystemController(IApplyLeaveService<ApplyLeave> Service, ApplicationDbContext applicationDbContext)
        {
            _Service = Service;
            _applicationDbContext = applicationDbContext;
        }


        [HttpGet("employee/{userId}")]
        public IActionResult GetEmployeeLeavesByUserId(int userId)
        {
            var leaves = _Service.GetEmployeeByUserId(userId); // Change _applyLeaveService to _Service
            return Ok(leaves);
        }
       



        [HttpPost(nameof(CreateApplyLeave))]
        public IActionResult CreateApplyLeave(ApplyLeave ApplyLeave)
        {
            if (ApplyLeave != null)
            {
                _Service.Insert(ApplyLeave);
                return Ok("Created Successfully");
            }
            else
            {
                return BadRequest("Something went wrong");
            }
        }

        [HttpPut(nameof(UpdateApplyLeave))]
        public IActionResult UpdateApplyLeave(ApplyLeave applyLeave)
        {
            if (applyLeave != null)
            {
                // Assuming your service has a method to update by userId
                _Service.Update(applyLeave);

                return Ok("Updated Successfully");
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet(nameof(GetManagerNames))]
        public IActionResult GetManagerNames()
        {
            var managerNames = _Service.GetManagerNames();
            return Ok(managerNames);
        }

        [HttpGet("GetLeaveStatusForManagedUsers/{managerName}")]
        public IActionResult GetLeaveStatusForManagedUsers(string managerName)
        {
            try
            {
                // Implement the logic to retrieve leave status data for users managed by the specified managerName
                var leaveStatusList = _Service.GetLeaveStatusForManagedUsers(managerName);
                return Ok(leaveStatusList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("UpdateLeaveStatus/{userId}/{startDate}/{endDate}/{status}/{managercomment}")]
        public async Task<IActionResult> UpdateLeaveStatus(
            int userId,
            DateTime startDate,
            DateTime endDate,
            string status,
            string managercomment) // Note: You don't need [FromBody] in this case
        {
            try
            {
                // Retrieve the leave request from the database based on userId, startDate, and endDate
                var leave = await _applicationDbContext.ApplyLeaves
                    .FirstOrDefaultAsync(x =>
                        x.UserId == userId &&
                        x.StartDate == startDate &&
                        x.EndDate == endDate);

                if (leave == null)
                {
                    return NotFound();
                }

                // Update the leave status and managercomment
                leave.status = status;
                leave.managercomment = managercomment;

                // Save changes to the database
                await _applicationDbContext.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet(nameof(GetAllNames))]
        public IActionResult GetAllNames(string tenantName)
        {
            try
            {
                // Assuming you have a Tenant column in the Management table
                var allNames = _applicationDbContext.Managements
                    .Where(m => m.tenantName == tenantName)
                    .Select(m => new { m.firstName, m.lastName })
                    .Distinct()
                    .ToList();

                return Ok(allNames);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving all names: {ex.Message}");
            }
        }


        [HttpDelete("DeleteApplyLeave/{id}")]

        public IActionResult Delete(string id)
        {
            var screenshot = _Service.Delete(id);
            return Ok(screenshot);
        }

    }
}
