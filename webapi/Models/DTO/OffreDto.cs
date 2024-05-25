using System.ComponentModel.DataAnnotations;

namespace webapi.Models.DTO
{
    public class OffreDto
    {
       public string Type { get; set; }
       
        public string Description { get; set; }
        
        public double Price { get; set; }
        public int Access { get; set; }
    }
}
