using Domain_Layer.Application;
using Domain_Layer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository_Layer.Repository;
using Service_Layer.Custom_Service;
using Service_Layer.ICustomService;
using System;

namespace TenantManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskManagementController : ControllerBase
    {
        private readonly TaskServiceInterface1<taskStructure> _customService;
        private readonly ApplicationDbContext _applicationDbContext;
        public TaskManagementController(TaskServiceInterface1<taskStructure> customService, ApplicationDbContext applicationDbContext)
        {
            _customService = customService;
            _applicationDbContext = applicationDbContext;
        }
        [HttpGet(nameof(GetTasksByTenantName))]
        public IActionResult GetTasksByTenantName(string tenantName)
        {
            try
            {
                var users = _customService.GetTasksByTenantName(tenantName);

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
                        return NotFound();
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
        [HttpGet(nameof(GetByUserName))]
        public IActionResult GetByUserName(string userName, string tenant)
        {
            try
            {
                // Assuming _customService.GetByUserName accepts both userName and tenant
                var obj = _customService.GetTasksByUserAndTenant(userName, tenant);

                if (obj == null)
                {
                    if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(tenant))
                    {
                        // Handle the case where either userName or tenant is empty
                        return Ok(new List<taskStructure>()); // Or return NotFound("No data found for the specified parameters");
                    }
                    else
                    {
                        return NotFound($"No data found for the specified userName: {userName} and tenant: {tenant}");
                    }
                }
                else
                {
                    return Ok(obj);
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }


        [HttpGet(nameof(GetById))]
        public IActionResult GetById(int Id)
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

        [HttpGet(nameof(GetAll))]
        public IActionResult GetAll()
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
        [HttpPost(nameof(Create))]
        public IActionResult Create(taskStructure taskVariable)
        {

            if (taskVariable != null)
            {
                _customService.Insert(taskVariable);
                return Ok(taskVariable);
            }
            else
            {
                return BadRequest("Something went wrong");
            }
        }
        [HttpPut(nameof(Update))]
        public IActionResult Update(taskStructure taskVariable)
        {
            if (taskVariable != null)
            {
                _customService.Update(taskVariable);
                return Ok(taskVariable);
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpDelete("Delete/{Id}")]
        public IActionResult Delete(string Id)
        {
            var taskDetails = _customService.Delete(Id);
            return Ok(taskDetails);
        }
    }
}