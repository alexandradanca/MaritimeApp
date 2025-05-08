using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Country
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Port> Ports { get; set; }
    }
}
