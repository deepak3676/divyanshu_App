using Domain_Layer.Application;
using Domain_Layer.Models;
using Microsoft.EntityFrameworkCore;
using Repository_Layer.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository_Layer.Repository
{
    public class LoginRepo : ILoginRepo
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public LoginRepo(ApplicationDbContext ApplicationDbContext)
        {
            _applicationDbContext = ApplicationDbContext;
        }



        public async Task<Login> Get(string email, string password)
        {
            return await _applicationDbContext.Login
                .FirstOrDefaultAsync(l => l.email == email && l.password == password);
        }
    }
}
