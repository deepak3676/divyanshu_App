using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.ICustomService
{
    public interface TaskServiceInterface1<T> where T : class
    {
        IEnumerable<T> GetAll();
        IEnumerable<T> GetTasksByTenantName(string tenantName);
        IEnumerable<T> GetTasksByUserAndTenant(string userName, string tenantName);
        T Get(int Id);
        void Insert(T entity);
        void Update(T entity);
        bool Delete(string Id);
    }
}
