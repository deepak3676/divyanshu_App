using Domain_Layer.Application;
using Domain_Layer.Models;
using Microsoft.EntityFrameworkCore;
using Repository_Layer.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository_Layer.ProjectRepo
{
    public class ProjectRepo<T> : IProjectRepo<T> where T : projectModel
    {
        private readonly ApplicationDbContext _applicationDbContext;
    private DbSet<T> entities;

    #region Constructor
    public ProjectRepo(ApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
        entities = _applicationDbContext.Set<T>();
    }


    public T Get(int Id)
    {
        return entities.SingleOrDefault(c => c.ProjectId == Id);
    }

    public IEnumerable<T> GetAll()
    {
        return entities.AsEnumerable();
    }

    public void Insert(T entity)
    {
        if (entity == null)
        {
            throw new ArgumentNullException("entity");
        }
        entities.Add(entity);
        _applicationDbContext.SaveChanges();
    }

    public void SaveChanges()
    {
        _applicationDbContext.SaveChanges();
    }

    public void Update(T entity)
    {
        if (entity == null)
        {
            throw new ArgumentNullException("entity");
        }
        entities.Update(entity);
        _applicationDbContext.SaveChanges();
    }
    public IEnumerable<string> GetAllProjectNames()
    {
        return entities.Select(c => c.projectName).ToList();
    }


    public IEnumerable<T> GetProjectsByMonth(int month)
    {
        return entities.Where(p => p.StartDate.Month == month || p.EndDate.Month == month).ToList();
    }
    #endregion

}
}
