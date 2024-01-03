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
    public class ProjectService : IProjectService<projectModel>
    {
        private readonly IProjectRepo<projectModel> _projectRepository;
        public ProjectService(IProjectRepo<projectModel> ProjectRepo)
        {
            _projectRepository = ProjectRepo;
        }
        public projectModel Get(int Id)
        {

            try
            {
                var obj = _projectRepository.Get(Id);
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

        public IEnumerable<projectModel> GetAll()
        {
            try
            {
                var obj = _projectRepository.GetAll();
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

        public IEnumerable<(int ProjectId, string ProjectName, string tenantName)> GetAllProjectNames()
        {
            try
            {
                var projects = _projectRepository.GetAll();

                if (projects != null)
                {

                    return projects.Select(p => (p.ProjectId, p.projectName, p.tenantName)).ToList();
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

        public IEnumerable<projectModel> GetProjectsByMonth(int month)
        {
            try
            {
                var projects = _projectRepository.GetProjectsByMonth(month);

                if (projects != null)
                {
                    return projects;
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

        public void Insert(projectModel entity)
        {
            try
            {
                if (entity != null)
                {
                    _projectRepository.Insert(entity);
                    _projectRepository.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Update(projectModel entity)
        {
            try
            {
                if (entity != null)
                {
                    _projectRepository.Update(entity);
                    _projectRepository.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }


    }
}