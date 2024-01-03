using Domain_Layer.Application;
using Domain_Layer.Models;
using Microsoft.AspNetCore.Mvc;
using Service_Layer.ICustomService;

namespace TenantManagementSystem.Controllers
{
    public class projectReportController : Controller
    {
        private readonly IProjectService<projectModel> _customService;
        private readonly ApplicationDbContext _applicationDbContext;
        public projectReportController(IProjectService<projectModel> TableProjectsService, ApplicationDbContext applicationDbContext)
        {
            _customService = TableProjectsService;
            _applicationDbContext = applicationDbContext;
        }
        [HttpGet(nameof(GetProjectReportById))]
        public IActionResult GetProjectReportById(int Id)
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
        [HttpGet(nameof(GetAllProjectReports))]
        public IActionResult GetAllProjectReports()
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

        [HttpGet(nameof(GetAllProjectNames))]
        public IActionResult GetAllProjectNames()
        {
            var obj = _customService.GetAllProjectNames();
            if (obj == null)
            {
                return NotFound();
            }
            else
            {
                // Modify the response to include both ProjectId and ProjectName
                var response = obj.Select(p => new { ProjectId = p.ProjectId, ProjectName = p.ProjectName,TenantName=p.tenantName });
                return Ok(response);
            }
        }


        [HttpGet("GetProjectReportByMonth/{month}")]
        public IActionResult GetProjectsByMonth(int month)
        {
            var projects = _customService.GetProjectsByMonth(month);

            if (projects != null)
            {
                return Ok(projects);
            }
            else
            {
                return NotFound();
            }
        }

    }

}