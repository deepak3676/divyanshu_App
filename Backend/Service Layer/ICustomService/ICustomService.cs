using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.ICustomService
{
    public interface ICustomService<T> where T : class
    {
        IEnumerable<T> GetAll();
        IEnumerable<string> GetUsersByTenantName(string tenantName);
        
        T Get(int Id);
        void Insert(T entity);
        void Update(T entity);
        bool Delete(string Id);
        Task<T> GetByEmailAndPasswordAsync(string email, string password);
    }
}
