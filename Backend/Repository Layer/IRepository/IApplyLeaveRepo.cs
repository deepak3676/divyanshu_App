using Domain_Layer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository_Layer.IRepository
{
    public interface IApplyLeaveRepo<T> where T : ApplyLeave
    {


        IEnumerable<T> GetAll();
        T Get(int Id);
        void Insert(T entity);
        void Update(T entity);
        void Delete(int id);

        void SaveChanges();
        IEnumerable<string> GetManagerNames();
        List<ApplyLeave> GetLeaveStatusForManagedUsers(string managerName);
    }
}
