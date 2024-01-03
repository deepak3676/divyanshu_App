using Domain_Layer.Application;
using Domain_Layer.Models;
using Microsoft.EntityFrameworkCore;
using Repository_Layer.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Repository_Layer.IRepository.IRepository;

namespace Repository_Layer.Repository
{
    public class TaskRepository<T> : TaskInterface1<T> where T : taskStructure
    {
        #region property
        private readonly ApplicationDbContext _applicationDbContext;
        private DbSet<T> entities;
        #endregion
        #region Constructor
        public TaskRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            entities = _applicationDbContext.Set<T>();
        }
        #endregion
        public void Delete(int Id)
        {
            var result = _applicationDbContext.taskTable3.FirstOrDefault(l => l.Id == Id);

            if (result != null)
            {
                _applicationDbContext.taskTable3.Remove(result);
                _applicationDbContext.SaveChanges();
            }
        }
        public IEnumerable<T> GetAll()
        {
            return entities.AsEnumerable();
        }
        public IEnumerable<T> GetTasksByUserAndTenant(string userName, string tenantName)
        {
            return entities.Where(e => e.userName == userName && e.tenantName == tenantName).ToList();
        }
        public T Get(int Id)
        {
            return entities.SingleOrDefault(c => c.Id == Id);
        }
        public IEnumerable<T> GetTasksByTenantName(string tenantName)
        {
            return entities.Where(task => task.tenantName == tenantName).ToList();
        }
        public void Insert(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entities.Add(entity);
            _applicationDbContext.SaveChanges();
        }
        public void SaveChanges()
        {
            _applicationDbContext.SaveChanges();
        }
        public void Update(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entities.Update(entity);
            _applicationDbContext.SaveChanges();
        }
    }
}
