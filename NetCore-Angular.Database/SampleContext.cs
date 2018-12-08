using Microsoft.EntityFrameworkCore;
using NetCore_Angular.Database.Entities;

namespace NetCore_Angular.Database
{
    public class SampleContext : DbContext
    {
        #region Entities 
        public DbSet<User> Users { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }

        #endregion
        public SampleContext(DbContextOptions<SampleContext> options)
            : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            #region SeedData

            User user = new User
            {
                Name = "Andrés Londoño",
                Email = "andreslon@outlook.com",
                Password = "admin",
                UserName = "admin"
            };

            modelBuilder.Entity<User>().HasData(user);

            modelBuilder.Entity<Vehicle>().HasData(
            new Vehicle
            {
                UserId = user.Id,
                City = "Medellín",
                Latitude = 6.217,
                Longitude = -75.567,
                Odometer = 52000,
                Plate = "ABC-123"
            },
            new Vehicle
            {
                UserId = user.Id,
                City = "Bogotá",
                Latitude = 4.588651,
                Longitude = -74.148037,
                Odometer = 145000,
                Plate = "AZY-22A"
            });

            #endregion
        }
    }
}
