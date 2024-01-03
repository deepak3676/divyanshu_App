using Domain_Layer.Application;
using Domain_Layer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service_Layer.Custom_Service;
using System.Globalization;
using System;
using Microsoft.EntityFrameworkCore;
using Service_Layer.ICustomService;

namespace TenantManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {


        private readonly IAttService<Attendances> _AttendanceServices;

        private readonly ApplicationDbContext _applicationDbContext;
        private readonly Attendances Attendance;
        public AttendanceController(IAttService<Attendances> AttendanceServices, ApplicationDbContext appDbContext)
        {
            _AttendanceServices = AttendanceServices;
            _applicationDbContext = appDbContext;
        }
        [HttpGet(nameof(GetAttendanceById))]
        public IActionResult GetAttendanceById(int id)
        {

            var obj = _AttendanceServices.Get(id);
          

            if (obj == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(obj);
            }
        }
    



        [HttpGet(nameof(GetAllManagementAndAttendance))]
        public IActionResult GetAllManagementAndAttendance()
        {
            try
            {
                List<Management> allManagements = _applicationDbContext.Managements.ToList();

                var result = new List<object>();

                foreach (Management management in allManagements)
                {

                    List<Attendances> attendance = _AttendanceServices.GetAttendanceByManagementId(management.id);


                    if (attendance != null && attendance.Any())
                    {
                        foreach (var attendanceRecord in attendance)
                        {
                            var entry = new
                            {
                                Management = management,
                                Attendance = attendanceRecord
                            };

                            result.Add(entry);
                        }
                    }
                }


                // Extract the Attendances objects from the result and pass them to CalculateHours
                var attendancesList = result.Select(entry => ((dynamic)entry).Attendance).Cast<Attendances>().ToList();
                _AttendanceServices.CalculateHours(attendancesList);


                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving all management and attendance entries: {ex.Message}");
            }
        }
        [HttpGet(nameof(GetAllManagementAndAttendanceByMonthbytenantName))]
        public IActionResult GetAllManagementAndAttendanceByMonthbytenantName(string tenantName, string monthName)
        {
            try
            {
                // Fetch all data from the database for the specified tenant
                List<Management> allManagements = _applicationDbContext.Managements
                    .Where(m => m.tenantName == tenantName)
                    .ToList();

                // Filter data based on the specified month
                List<object> result = new List<object>();

                foreach (var management in allManagements)
                {

                    List<Attendances> attendance = _AttendanceServices.GetAttendanceByManagementIdAndMonth(management.id, monthName);


                    if (attendance != null && attendance.Any())
                    {
                        foreach (var attendanceRecord in attendance)
                        {
                            var entry = new
                            {
                                Management = management,
                                Attendance = attendanceRecord
                            };

                            result.Add(entry);
                        }
                    }
                }


                // Extract the Attendances objects from the result and pass them to CalculateHours
                var attendancesList = result.Select(entry => ((dynamic)entry).Attendance).Cast<Attendances>().ToList();
                _AttendanceServices.CalculateHours(attendancesList);


                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving management and attendance entries by month: {ex.Message}");
            }
        }

        [HttpGet(nameof(GetAllFirstNamesByTenant))]
        public IActionResult GetAllFirstNamesByTenant(string tenantName)
        {
            try
            {
                List<string> allFullNames = _applicationDbContext.Managements
                .Where(m => m.tenantName == tenantName)
                .Select(m => $"{m.firstName} {m.lastName}") // Combine first name and last name into a single string
                .Distinct()
               .ToList();

                return Ok(allFullNames);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving first names for tenant '{tenantName}': {ex.Message}");
            }
        }

        [HttpGet("months")]
        public IActionResult GetMonths()
        {
            try
            {
                // Fetch attendance data from the database

                var attendances = _applicationDbContext.Attendance.ToList();


                // Extract month names
                List<string> monthNames = new List<string>();
                foreach (var attendance in attendances)
                {
                    string monthName = attendance.LoginTime.ToString("MMMM");
                    monthNames.Add(monthName);
                }

                return Ok(monthNames);
            }
            catch (Exception ex)
            {
                // Handle exceptions appropriately
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpGet(nameof(GetAllManagementAndAttendanceBytenant))]
        public IActionResult GetAllManagementAndAttendanceBytenant(string tenantName)
        {
            try
            {
                // Fetch all data from the database for the specified firstName and tenantName
                List<Management> allManagements = _applicationDbContext.Managements
                .Where(m => m.tenantName == tenantName)
                .ToList();


                List<object> result = new List<object>();

                foreach (var management in allManagements)
                {
                    // Assuming you have a method to get attendance by management ID

                    List<Attendances> attendance = _AttendanceServices.GetAttendanceByManagementId(management.id);


                    if (attendance != null && attendance.Any())
                    {
                        foreach (var attendanceRecord in attendance)
                        {
                            var entry = new
                            {
                                Management = management,
                                Attendance = attendanceRecord
                            };

                            result.Add(entry);
                        }
                    }
                }

                // Extract the Attendances objects from the result and pass them to CalculateHours
                var attendancesList = result.Select(entry => ((dynamic)entry).Attendance).Cast<Attendances>().ToList();
                _AttendanceServices.CalculateHours(attendancesList);


                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving management and attendance entries by firstName: {ex.Message}");
            }
        }

    }
}
