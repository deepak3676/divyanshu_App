using Domain_Layer.Application;
using Domain_Layer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Repository_Layer.IRepository.IRepository;

namespace Repository_Layer.Repository
{
    public class Repository <T> : IRepository<T> where T : Management
    {
        #region property
        private readonly ApplicationDbContext _applicationDbContext;
        private DbSet<T> entities;
        #endregion
        #region Constructor
        public Repository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            entities = _applicationDbContext.Set<T>();
        }
        #endregion
        public void Delete(int Id)
        {
            var result = _applicationDbContext.Managements.FirstOrDefault(l => l.id == Id);
            if (result != null)
            {
                _applicationDbContext.Managements.Remove(result);
                _applicationDbContext.SaveChanges();
            }
        }
        public IEnumerable<string> GetUsersByTenantName(string tenantName)
        {
            return entities.Where(e => e.tenantName == tenantName).Select(e => e.email).Distinct().ToList();
        }
        public T Get(int Id)
        {
            return entities.SingleOrDefault(c => c.id == Id);
        }
        public IEnumerable<T> GetAll()
        {
            return entities.AsEnumerable();
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
        public void Remove(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entities.Remove(entity);
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

        public async Task<T> GetByEmailAndPasswordAsync(string email, string password)
        {
            return await entities.FirstOrDefaultAsync(c => c.email == email && c.password == password);
        }
    }
}
