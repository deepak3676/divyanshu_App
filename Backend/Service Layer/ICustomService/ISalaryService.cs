using Domain_Layer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.ICustomService
{
    public interface ISalaryService
    {
        Task<IEnumerable<SalaryRecord>> GetEmployeeDetailsAsync(int employeeId);
        Task<IEnumerable<SalaryRecord>> GetSalaryRecordsByMonthAsync(string month);
        Task<bool> AddSalaryRecordAsync(SalaryRecord salaryRecord);
        Task<IEnumerable<string>> GetAllMonthsAsync();
        Task<IEnumerable<SalaryRecord>> GetAllEmployeesAsync();
    }
}
