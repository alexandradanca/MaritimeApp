using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Ship
    {
        [Key]
        public int Id { get; set; }

        public string ShipName { get; set; }

        public float MaxSpeed { get; set; }

        public ICollection<Voyage> Voyages { get; set; }
    }
}
