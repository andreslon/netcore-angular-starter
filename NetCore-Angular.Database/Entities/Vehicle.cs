using System;
using System.ComponentModel.DataAnnotations;

namespace NetCore_Angular.Database.Entities
{
    public class Vehicle
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required]
        [StringLength(200)]
        public string Plate { get; set; }
        [Required]
        [StringLength(200)]
        public string City { get; set; }
        [Required]
        public double Latitude { get; set; }
        [Required]
        public double Longitude { get; set; }
        [Required]
        public double Odometer { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
