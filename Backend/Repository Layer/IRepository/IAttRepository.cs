using Domain_Layer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository_Layer.IRepository
{
    public interface IAttRepository<T> where T : Attendances
    {

        IEnumerable<T> GetAll();
        T Get(int id);
        void Insert(T entity);
        void Update(T entity);
        void SaveChanges();
        void Delete(T entity);
     
    }
}
