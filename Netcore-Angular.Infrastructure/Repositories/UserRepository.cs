using Microsoft.EntityFrameworkCore;
using netcore_angular.infrastructure.Repositories.Interfaces;
using NetCore_Angular.Database.Entities;

namespace netcore_angular.infrastructure.Repositories
{ 
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(DbContext context) : base(context)
        {

        } 
    }
}
