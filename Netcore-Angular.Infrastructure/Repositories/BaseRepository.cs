using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using netcore_angular.infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace netcore_angular.infrastructure.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T>
    where T : class, new()
    {
        public DbContext Context { get; set; }

        #region Constructor

        public BaseRepository(DbContext context)
        {
            Context = context;
        }

        #endregion

        #region Functions 
        public virtual int Count()
        {
            return GetAll().Count();
        }

        public virtual int Count(Expression<Func<T, bool>> predicate)
        {
            return GetAll().Count(predicate);
        }

        public virtual bool Any(Expression<Func<T, bool>> predicate)
        {
            return GetAll().Any(predicate);
        }

        public virtual bool All(Expression<Func<T, bool>> predicate)
        {
            return GetAll().All(predicate);
        }

        public virtual IQueryable<T> GetAll()
        {
            var entitySet = Context.Set<T>();
            return entitySet.AsQueryable();
        }

        public virtual T GetSingle(Expression<Func<T, bool>> predicate)
        {
            return GetAll().FirstOrDefault(predicate);
        }

        public virtual IQueryable<T> FindBy(Expression<Func<T, bool>> predicate)
        {
            return GetAll().Where(predicate);
        }

        public virtual EntityEntry<T> Add(T entity)
        {
            var entitySet = Context.Set<T>();
            return entitySet.Add(entity);
        }

        public virtual void Update(T entity)
        {
            var entitySet = Context.Set<T>();
            var dbEntity = entitySet.Attach(entity);
            var dbEntry = Context.Entry(entity);
            dbEntry.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        }

        public virtual void Delete(T entity)
        {
            var entitySet = Context.Set<T>();
            var dbEntityEntry = entitySet.Attach(entity);
            entitySet.Remove(entity);
        }

        public virtual void DeleteWhere(Expression<Func<T, bool>> predicate)
        {
            IQueryable<T> entities = FindBy(predicate);
            var entitySet = Context.Set<T>();
            entitySet.RemoveRange(entities);
        }

        public virtual int Commit()
        {
            return Context.SaveChanges();
        }

        #endregion
    }
}
