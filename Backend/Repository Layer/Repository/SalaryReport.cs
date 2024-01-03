using Domain_Layer.Application;
using Microsoft.EntityFrameworkCore;
using Repository_Layer.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository_Layer.Repository
{
    public class SalaryReport<T> : ISalaryReport<T> where T : class
    {
        private readonly ApplicationDbContext _context;

        public SalaryReport(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<IEnumerable<T>> GetByMonthAsync(string month)
        {
            return await _context.Set<T>().Where(x => EF.Property<string>(x, "SalaryMonth") == month).ToListAsync();
        }

        public async Task<IEnumerable<T>> GetByEmployeeIdAsync(int employeeId)
        {
            return await _context.Set<T>().Where(x => EF.Property<int>(x, "EmployeeId") == employeeId).ToListAsync();
        }

        public async Task AddAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<string>> GetAllMonthsAsync()
        {

            var orderedMonths = await _context.Set<T>()
          .Select(x => EF.Property<string>(x, "SalaryMonth"))
          .Distinct()
          .ToListAsync();

            // Define a mapping of month names to numerical values
            var monthOrder = new Dictionary<string, int>
    {
        { "January", 1 },
        { "February", 2 },
        { "March", 3 },
        { "April", 4 },
        { "May", 5 },
        { "June", 6 },
        { "July", 7 },
        { "August", 8 },
        { "September", 9 },
        { "October", 10 },
        { "November", 11 },
        { "December", 12 }
    };

            // Order the months based on the numerical values
            orderedMonths = orderedMonths.OrderBy(m => monthOrder.GetValueOrDefault(m, int.MaxValue)).ToList();

            return orderedMonths;
        }

       
    }
}
