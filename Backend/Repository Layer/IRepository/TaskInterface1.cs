using Domain_Layer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository_Layer.IRepository
{
    public interface TaskInterface1<T> where T : taskStructure
    {
        IEnumerable<T> GetAll();
        IEnumerable<T> GetTasksByTenantName(string tenantName);
        IEnumerable<T> GetTasksByUserAndTenant(string userName, string tenantName);
        T Get(int Id);
        void Insert(T entity);
        void Update(T entity);
        void Delete(int Id);
        void SaveChanges();
    }
}
