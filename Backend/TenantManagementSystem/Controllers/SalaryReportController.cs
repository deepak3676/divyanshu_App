using Domain_Layer.Application;
using Domain_Layer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Service_Layer.ICustomService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TenantManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaryReportController : ControllerBase
    {
        private readonly ISalaryService _service;
        private readonly ApplicationDbContext _applicationDbContext;

        public SalaryReportController(ISalaryService service, ApplicationDbContext appDbContext)
        {
            _service = service;
            _applicationDbContext = appDbContext;
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

        [HttpGet("employee-details/{employeeId}")]
        public async Task<ActionResult<IEnumerable<SalaryRecord>>> GetEmployeeDetails(int employeeId)
        {
            var employeeDetails = await _service.GetEmployeeDetailsAsync(employeeId);
            return Ok(employeeDetails);
        }

        [HttpGet("salary-records/{month}")]
        public async Task<ActionResult<IEnumerable<SalaryRecord>>> GetSalaryRecordsByMonth(string month)
        {
            var salaryRecords = await _service.GetSalaryRecordsByMonthAsync(month);
            return Ok(salaryRecords);
        }

      
        [HttpGet("all-months")]
        public async Task<ActionResult<IEnumerable<string>>> GetAllMonths()
        {
            var months = await _service.GetAllMonthsAsync();
            return Ok(months);
        }

        [HttpGet("getSalaryData/{firstName}/{salaryMonth}")]
        public async Task<IActionResult> GetSalaryData(string firstName, string salaryMonth)
        {
            try
            {
                // Retrieve EmployeeId from Management table based on FirstName
                var employee = await _applicationDbContext.Managements
                    .Where(m => m.firstName == firstName)
                    .FirstOrDefaultAsync();

                if (employee == null)
                {
                    return NotFound("Employee not found");
                }

                // Retrieve Salary Records for the specified EmployeeId and SalaryMonth
                var salaryRecords = await _applicationDbContext.SalaryRecords
                    .Where(s => s.EmployeeId == employee.id && s.SalaryMonth == salaryMonth)
                    .ToListAsync();

                return Ok(salaryRecords);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("add-salary-record")]
        public async Task<IActionResult> AddSalaryRecord([FromBody] SalaryRecordRequest salaryRecordRequest)
        {
            try
            {
                // Validate the request data
                if (salaryRecordRequest == null)
                {
                    return BadRequest("Invalid request data");
                }

                // Create a new SalaryRecord instance
                var newSalaryRecord = new SalaryRecord
                {
                    EmployeeId = salaryRecordRequest.EmployeeId, // Assuming EmployeeId is provided in the request
                    SalaryMonth = salaryRecordRequest.SalaryMonth,
                    Salary = salaryRecordRequest.Salary,
                    Leaves = salaryRecordRequest.Leaves,
                    Deductions = salaryRecordRequest.Deductions,
                    NetPay = salaryRecordRequest.NetPay
                };

                // Add the new salary record to the database
                _applicationDbContext.SalaryRecords.Add(newSalaryRecord);
                await _applicationDbContext.SaveChangesAsync();

                return Ok("Salary record added successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



    }


}

