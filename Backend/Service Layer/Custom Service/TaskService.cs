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
    public class TaskService : TaskServiceInterface1<taskStructure>
    {
        private readonly TaskInterface1<taskStructure> _taskRepository;
        public TaskService(TaskInterface1<taskStructure> taskRepository)
        {
            _taskRepository = taskRepository;
        }
        public bool Delete(string Id)
        {
            try
            {
                _taskRepository.Delete(Convert.ToInt32(Id));
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
       
        public taskStructure Get(int Id)
        {
            try
            {
                var obj = _taskRepository.Get(Id);
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
        public IEnumerable<taskStructure> GetTasksByTenantName(string tenantName)
        {
            try
            {
                var obj = _taskRepository.GetTasksByTenantName(tenantName);
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
        public IEnumerable<taskStructure> GetTasksByUserAndTenant(string userName, string tenantName)
        {
            try
            {
                var obj = _taskRepository.GetTasksByUserAndTenant(userName, tenantName);

                // Check if obj is not null or empty before returning
                if (obj != null && obj.Any())
                {
                    return obj;
                }
                else
                {
                    return new List<taskStructure>(); // Return an empty list if no tasks are found
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IEnumerable<taskStructure> GetAll()
        {
            try
            {
                var obj = _taskRepository.GetAll();
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
        public void Insert(taskStructure entity)
        {
            try
            {
                if (entity != null)
                {
                    _taskRepository.Insert(entity);
                    _taskRepository.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Update(taskStructure entity)
        {
            try
            {
                if (entity != null)
                {
                    _taskRepository.Update(entity);
                    _taskRepository.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
