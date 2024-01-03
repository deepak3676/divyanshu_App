using Domain_Layer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.ICustomService
{
    public interface IApplyLeaveService<T> where T : ApplyLeave
    {
        IEnumerable<T> GetAll();
        T Get(int Id);
        IEnumerable<T> GetEmployeeByUserId(int userId);
        void Insert(T entity);
        void Update(T entity);
        bool Delete(string id);
        IEnumerable<string> GetManagerNames();
        List<ApplyLeave> GetLeaveStatusForManagedUsers(string managerName);
        




    }
}
