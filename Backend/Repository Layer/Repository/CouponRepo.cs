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
    public class CouponRepo<T> : ICouponRepo<T> where T : Coupon
    {
        private readonly ApplicationDbContext _appDbContext;
        private DbSet<T> entities;

        public CouponRepo(ApplicationDbContext appDbContext)
        {
            _appDbContext = appDbContext ?? throw new ArgumentNullException(nameof(appDbContext));
            entities = _appDbContext.Set<T>();
        }

        public T Get(long id)
        {
            return entities.SingleOrDefault(c => c.Id == id);
        }

        public IEnumerable<T> GetAll()
        {
            return entities.AsEnumerable();
        }

        public void insert(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            // Ensure that DateTime properties are in UTC before saving
            entity.StartDate = entity.StartDate.ToUniversalTime();
            entity.EndDate = entity.EndDate.ToUniversalTime();

            entities.Add(entity);
            _appDbContext.SaveChanges();
        }

        public void delete(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }
            entities.Remove(entity);
            _appDbContext.SaveChanges();
        }

        public void delete(long id)
        {
            var entity = entities.Find(id);
            if (entity != null)
            {
                entities.Remove(entity);
                _appDbContext.SaveChanges();
            }
        }


        public void savechanges()
        {
            _appDbContext.SaveChanges();
        }


        public void update(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            // Ensure that DateTime properties are in UTC before saving
            entity.StartDate = entity.StartDate.ToUniversalTime();
            entity.EndDate = entity.EndDate.ToUniversalTime();

            entities.Update(entity);
            _appDbContext.SaveChanges();
        }


        public void InsertRange(IEnumerable<T> entities)
        {
            _appDbContext.Set<T>().AddRange(entities);
            _appDbContext.SaveChanges();
        }
    }

}