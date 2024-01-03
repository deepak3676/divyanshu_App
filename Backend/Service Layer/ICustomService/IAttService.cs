using Domain_Layer.Application;
using Domain_Layer.Models;
using Microsoft.EntityFrameworkCore;
using Repository_Layer.IRepository;
using Service_Layer.Custom_Service;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.ICustomService
{
    public interface IAttService<T> where T : class
    {
        IEnumerable<T> GetAll();

        void CalculateHours(IEnumerable<Attendances> records);
        T Get(int id);
        void Insert(T entity);
        void Update(T entity);
        void Delete(T entity);
        List<Attendances> GetAllAttendances();
        void CreateManagementUserAndAttendance(Management management);
        List<Attendances> GetAttendanceByManagementId(int id);
        List<Attendances> GetAttendanceByManagementIdAndMonth(int id, string monthName);
    }


}

