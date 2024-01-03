using Domain_Layer.Models;
using Repository_Layer.IRepository;
using Service_Layer.ICustomService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.Custom_Service
{
    public class LoginService : ILoginService
    {
        private readonly ILoginRepo _loginRepository;
        private readonly ICustomService<Management> _customService;

        public LoginService(ILoginRepo loginRepo, ICustomService<Management> customService)
        {
            _loginRepository = loginRepo;
            _customService = customService;
        }

        public async Task<Login> Get(string email, string password)
        {
            var user = await _loginRepository.Get(email, password);

            if (user != null)
            {
                return user;
            }
            else
            {
                var signupUser = await _customService.GetByEmailAndPasswordAsync(email, password);

                if (signupUser != null)
                {
                    // Create a new Login object with UserId
                    var login = new Login
                    {
                        email = signupUser.email,
                        password = signupUser.password,
                        id = signupUser.id // Set UserId here
                    };

                    return login;
                }
                else
                {
                    return null;
                }
            }
        }
    }
}
