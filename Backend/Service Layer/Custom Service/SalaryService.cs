using Domain_Layer.Application;
using Domain_Layer.Models;
using Repository_Layer.IRepository;
using Service_Layer.ICustomService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.Custom_Service
{
    public class SalaryService : ISalaryService
    {
      
        private readonly ISalaryReport<SalaryRecord> _salaryRecordRepository;
        private readonly ApplicationDbContext _applicationDbContext;

        public SalaryService( ISalaryReport<SalaryRecord> salaryRecordRepository, ApplicationDbContext applicationDbContext)
        {
           
            _salaryRecordRepository = salaryRecordRepository;
            _applicationDbContext = applicationDbContext;
        }

        public async Task<IEnumerable<SalaryRecord>> GetAllEmployeesAsync()
        {
            var employees = await _salaryRecordRepository.GetAllAsync();
            return employees;
        }

        public async Task<IEnumerable<SalaryRecord>> GetEmployeeDetailsAsync(int employeeId)
        {
            return await _salaryRecordRepository.GetByEmployeeIdAsync(employeeId);
        }

        public async Task<IEnumerable<SalaryRecord>> GetSalaryRecordsByMonthAsync(string month)
        {
            return await _salaryRecordRepository.GetByMonthAsync(month);
        }

        public async Task<bool> AddSalaryRecordAsync(SalaryRecord salaryRecord)
        {
            try
            {
                await _salaryRecordRepository.AddAsync(salaryRecord);
                await _salaryRecordRepository.SaveChangesAsync();
                return true;
            }
            catch
            {
                // Handle exceptions
                return false;
            }
        }
        public async Task<IEnumerable<string>> GetAllMonthsAsync()
        {
            return await _salaryRecordRepository.GetAllMonthsAsync();
        }

    }
}
