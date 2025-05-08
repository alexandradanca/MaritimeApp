using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Metrics;

namespace WebAPI.Models
{
    public class Port
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public int Id_Country { get; set; }
        public Country Country { get; set; }

        public ICollection<Voyage> DepartingVoyages { get; set; }
        public ICollection<Voyage> ArrivingVoyages { get; set; }
    }
}
