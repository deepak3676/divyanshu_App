using Domain_Layer.Application;
using Domain_Layer.Models;
using Microsoft.EntityFrameworkCore;
using Repository_Layer.IRepository;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository_Layer.Repository
{
    public class AttRepository<T> : IAttRepository<T> where T : Attendances
    {
        #region property
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly DbSet<T> entities;
        #endregion
        #region Constructor
        public AttRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            entities = _applicationDbContext.Set<T>();
        }
        #endregion



      

    public void Delete(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }
            entities.Remove(entity);
            _applicationDbContext.SaveChanges();
        }
        public T Get(int id)
        {
            return entities.SingleOrDefault(x => x.id == id);
        }

        public IEnumerable<T> GetAll()
        {
            return entities.AsEnumerable();
        }
        public void Insert(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
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
                throw new ArgumentNullException(nameof(entity));
            }
            entities.Update(entity);
            _applicationDbContext.SaveChanges();
        }

    }
}
