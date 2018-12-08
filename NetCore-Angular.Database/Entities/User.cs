using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NetCore_Angular.Database.Entities
{
    public class User
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required]
        [StringLength(200)]
        public string Name { get; set; }
        [Required]
        [StringLength(200)]
        public string UserName { get; set; }
        [Required]
        [StringLength(200)]
        public string Password { get; set; }
        [Required]
        [StringLength(200)]
        public string Email { get; set; }

        public List<Vehicle> Vehicles { get; set; }
    }
}
