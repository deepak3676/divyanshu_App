using Domain_Layer.Application;
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
    public class ApplyLeaveService : IApplyLeaveService<ApplyLeave>
    {
        private readonly IApplyLeaveRepo<ApplyLeave> _applyLeaveRepo;
        private readonly ApplicationDbContext _applicationDbContext;

        public ApplyLeaveService(IApplyLeaveRepo<ApplyLeave> applyLeaveRepo, ApplicationDbContext applicationDbContext)
        {
            _applyLeaveRepo = applyLeaveRepo;
            _applicationDbContext = applicationDbContext;
        }

        public bool Delete(string Id)
        {

            try
            {
                _applyLeaveRepo.Delete(Convert.ToInt32(Id));
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }

        }
        public ApplyLeave Get(int Id)
        {
            try
            {
                var obj = _applyLeaveRepo.Get(Id);
                return obj;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IEnumerable<ApplyLeave> GetAll()
        {
            try
            {
                var obj = _applyLeaveRepo.GetAll();
                return obj;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Insert(ApplyLeave entity)
        {
            try
            {
                if (entity != null)
                {
                    _applyLeaveRepo.Insert(entity);
                    _applyLeaveRepo.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Update(ApplyLeave entity)
        {
            try
            {
                if (entity != null)
                {
                    _applyLeaveRepo.Update(entity);
                    _applyLeaveRepo.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IEnumerable<string> GetManagerNames()
        {
            var managerNames = _applyLeaveRepo.GetManagerNames();
            return managerNames;
        }



        public List<ApplyLeave> GetLeaveStatusForManagedUsers(string managerName)
        {
            try
            {
                var leaveStatusList = _applyLeaveRepo.GetLeaveStatusForManagedUsers(managerName);
                return leaveStatusList.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
       





        public IEnumerable<ApplyLeave> GetEmployeeByUserId(int userId)
        {
            try
            {
                var leaves = _applyLeaveRepo.GetAll().Where(x => x.UserId == userId);
                return leaves;
            }
            catch (Exception)
            {
                throw;
            }
        }

        
    }
}
