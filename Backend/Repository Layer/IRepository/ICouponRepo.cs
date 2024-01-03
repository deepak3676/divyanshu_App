using Domain_Layer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository_Layer.IRepository
{
    public interface ICouponRepo<T> where T : Coupon
    {
        IEnumerable<T> GetAll();
        T Get(long Id);
        void insert(T entity);
        void update(T entity);
        void delete(T entity);
        void savechanges();
        void InsertRange(IEnumerable<T> entities);
    }
}
