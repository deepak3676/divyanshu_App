using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.ICustomService
{
    public interface IProjectService<T> where T : class
    {
        IEnumerable<T> GetAll();
        T Get(int Id);
        void Insert(T entity);
        void Update(T entity);

        IEnumerable<(int ProjectId, string ProjectName, string tenantName)> GetAllProjectNames();

        IEnumerable<T> GetProjectsByMonth(int month);
    }
}
