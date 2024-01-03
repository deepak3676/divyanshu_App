using Domain_Layer.Application;
using Domain_Layer.Models;
using Repository_Layer.IRepository;
using Service_Layer.ICustomService;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.Custom_Service
{
    public class AttService : IAttService<Attendances>
    {
        private readonly IAttRepository<Attendances> _AttendanceRepository;
        private readonly ApplicationDbContext _applicationDbContext;

        public AttService(IAttRepository<Attendances> AttendanceRepository, ApplicationDbContext applicationDbContext)
        {
            _AttendanceRepository = AttendanceRepository;
            _applicationDbContext = applicationDbContext;
        }
        public IAttRepository<Attendances>? AttendanceRepository
        {
            get; private set;
        }


        public void Delete(Attendances entity)
        {
            try
            {
                if (entity != null)
                {
                    _AttendanceRepository.Delete(entity);
                    _AttendanceRepository.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public List<Attendances> GetAttendanceByManagementIdAndMonth(int id, string monthName)
        {
            // Parse the month name to get the corresponding integer
            int targetMonth = DateTime.ParseExact(monthName, "MMMM", CultureInfo.InvariantCulture).Month;

            var result = _applicationDbContext.Attendance
                .Where(a => a.id == id && a.LoginTime.Month == targetMonth)
                .ToList();

            return result;
        }


        public Attendances? Get(int id)
        {
            try
            {
                var obj = _AttendanceRepository.Get(id);
                if (obj != null)
                {
                    return (Attendances)obj;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public IEnumerable<Attendances>? GetAll()
        {

            try
            {
                var obj = _AttendanceRepository.GetAll();
                if (obj != null)
                {
                    return obj;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public List<Attendances> GetAllAttendances()
        {
            return _applicationDbContext.Attendance.ToList();
        }
        public void CalculateHours(IEnumerable<Attendances> records)
        {
            foreach (var record in records)
            {
                if (record.LogoutTime != null && record.LoginTime != null)
                {
                    if (record.LogoutTime is DateTime logoutTime && record.LoginTime is DateTime loginTime)
                    {
                        // If LogoutTime is before 12 PM, add 12 hours to make it PM
                        if (loginTime.Hour != logoutTime.Hour)
                        {
                            if (logoutTime.Hour < 12)
                            {
                                logoutTime = logoutTime.Date.AddDays(1).AddSeconds(-1).AddHours(12);
                            }
                            record.Hours = logoutTime - loginTime;

                        }
                        if (loginTime.Hour == logoutTime.Hour)
                        {

                            record.Hours = logoutTime - loginTime;

                        }
                        else
                        {
                            // Set Hours to 00:00:00
                            record.Hours = TimeSpan.Zero;
                        }

                        // Calculate hours for the entire day (from 12 AM to 11:59 PM)
                        record.Hours = logoutTime - loginTime;
                        _AttendanceRepository.Update(record);
                        _AttendanceRepository.SaveChanges();
                    }
                    else
                    {
                        record.Hours = null;
                    }
                }
                else
                {
                    record.Hours = null;
                }
            }
        }
        public void Insert(Attendances entity)
        {
            try
            {
                if (entity != null)
                {
                    _AttendanceRepository.Insert(entity);
                    _AttendanceRepository.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Update(Attendances entity)
        {
            try
            {
                if (entity != null)
                {
                    _AttendanceRepository.Update(entity);
                    _AttendanceRepository.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public List<Attendances> GetAttendanceByManagementId(int id)
        {
            return _applicationDbContext.Attendance
                .Where(a => a.id == id)
                .ToList();
        }

        public void CreateManagementUserAndAttendance(Management management)
        {
            // Add the new user to the Management table
            _applicationDbContext.Managements.Add(management);
            _applicationDbContext.SaveChanges();

            // Create a corresponding entry in the Attendances table
            Attendances attendance = new Attendances
            {
                id = management.id,
                LoginTime = DateTime.Now,
                LogoutTime = DateTime.Now, // Set as needed
                Hours = TimeSpan.Zero // Set as needed
            };

            _applicationDbContext.Attendance.Add(attendance);
            _applicationDbContext.SaveChanges();
        }
    }

}

