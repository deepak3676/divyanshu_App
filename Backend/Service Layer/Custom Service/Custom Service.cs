
using Domain_Layer.Models;
using Repository_Layer.Repository;
using Service_Layer.ICustomService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Repository_Layer.IRepository.IRepository;

namespace Service_Layer.Custom_Service
{
    public class Custom_Service : ICustomService<Management>
    {
        private readonly IRepository<Management> _studentRepository;
        public Custom_Service(IRepository<Management> studentRepository)
        {
            _studentRepository = studentRepository;
        }
        public bool Delete(string Id)
        {
            try
            {
                _studentRepository.Delete(Convert.ToInt32(Id));
                return true;
            }
            catch (Exception ex)
            {
                // Log the exception or handle it appropriately
                return false;
            }
        }
        public IEnumerable<string> GetUsersByTenantName(string tenantName)
        {
            try
            {
                var obj = _studentRepository.GetUsersByTenantName(tenantName);
                if (obj != null)
                {
                    return obj;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<Management> GetByEmailAndPasswordAsync(string email, string password)
        {
            Management signupUser = await _studentRepository.GetByEmailAndPasswordAsync(email, password);
            return signupUser;
        }
        public Management Get(int Id)
        {
            try
            {
                var obj = _studentRepository.Get(Id);
                if (obj != null)
                {
                    return obj;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public IEnumerable<Management> GetAll()
        {
            try
            {
                var obj = _studentRepository.GetAll();
                if (obj != null)
                {
                    return obj;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public void Insert(Management entity)
        {
            try
            {
                if (entity != null)
                {
                    _studentRepository.Insert(entity);
                    _studentRepository.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        
        public void Update(Management entity)
        {
            try
            {
                if (entity != null)
                {
                    _studentRepository.Update(entity);
                    _studentRepository.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
