using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository_Layer.IRepository
{
    public interface ISalaryReport<T> where T : class
    {
        Task<T> GetByIdAsync(int id);
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<string>> GetAllMonthsAsync();
        Task<IEnumerable<T>> GetByMonthAsync(string month);
        Task<IEnumerable<T>> GetByEmployeeIdAsync(int employeeId);
        Task AddAsync(T entity);
        Task SaveChangesAsync();

    }
}
