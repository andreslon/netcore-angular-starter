using Microsoft.EntityFrameworkCore;
using netcore_angular.infrastructure.Repositories.Interfaces;
using NetCore_Angular.Database.Entities;

namespace netcore_angular.infrastructure.Repositories
{
    public class VehicleRepository : BaseRepository<Vehicle>, IVehicleRepository
    {
        public VehicleRepository(DbContext context) : base(context)
        {

        }
    }
}
