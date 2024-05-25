using webapi.Models.ApiModel;

namespace webapi.Models.DTO
{
    public class CommandDto
    {
        public int Id_command { get; set; }
        public DateTime Date { get; set; }
        public double Total { get; set; }
        public string Resume { get; set; }
        public IEnumerable<Offre> Tickets { get; set;}
        public User user { get; set; }

    }
}
