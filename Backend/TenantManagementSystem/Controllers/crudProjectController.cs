using Domain_Layer.Application;
using Domain_Layer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service_Layer.ICustomService;

namespace TenantManagementSystem.Controllers
{
    [Route("")]
    [ApiController]
    public class CrudProjectController : ControllerBase
    {
        private readonly IProjectService<projectModel> _customService;
        private readonly ApplicationDbContext _applicationDbContext;
        public CrudProjectController(IProjectService<projectModel> ProjectService, ApplicationDbContext applicationDbContext)
        {
            _customService = ProjectService;
            _applicationDbContext = applicationDbContext;
        }
        [HttpGet(nameof(GetProjectById))]
        public IActionResult GetProjectById(int Id)
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
        [HttpGet(nameof(GetAllProjectDetails))]
        public IActionResult GetAllProjectDetails()
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
        [HttpPost(nameof(createProject))]
        public IActionResult createProject(projectModel project)
        {
            if (project != null)
            {
                _customService.Insert(project);
                return Ok(project);
            }
            else
            {
                return BadRequest("Somethingwent wrong");
            }
        }
        [HttpPut(nameof(updateProject))]
        public IActionResult updateProject(projectModel project)
        {
            if (project != null)
            {
                _customService.Update(project);
                return Ok(project);
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
