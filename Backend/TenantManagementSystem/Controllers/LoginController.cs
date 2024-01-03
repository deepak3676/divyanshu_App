using Domain_Layer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service_Layer.Custom_Service;
using Service_Layer.ICustomService;

namespace TenantManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;

        public LoginController(ILoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpGet(nameof(Get))]
        public async Task<Login> Get(string email, string password)
        {
            try
            {
                Login login = await _loginService.Get(email, password);

                if (login != null)
                {
                    // You can access login.UserId here and use it as needed
                    return login;
                }
                else
                {
                    throw new InvalidOperationException("Login not found for the provided email and password.");
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions appropriately
                throw new Exception($"Error: {ex.Message}");
            }
        }
    }
}

