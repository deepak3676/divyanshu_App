using Domain_Layer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository_Layer.IRepository
{
    public interface IProjectRepo<T> where T : projectModel

    {
        IEnumerable<T> GetAll();
        T Get(int Id);
        void Insert(T entity);
        void Update(T entity);
        IEnumerable<string> GetAllProjectNames();
        IEnumerable<T> GetProjectsByMonth(int month);

        void SaveChanges();
    }
}
