using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Voyage
    {
        [Key]
        public int Id { get; set; }
        public DateTime VoyageDate { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }

        public int Id_Ship { get; set; }
        public Ship Ship { get; set; }

        public int Id_DeparturePort { get; set; }
        public Port DeparturePort { get; set; }

        public int Id_ArrivalPort { get; set; }
        public Port ArrivalPort { get; set; }
    }
}
