using System.ComponentModel.DataAnnotations;
using webapi.Validation;

namespace webapi.Models.DTO
{
    
    public class ClientDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        
    }
}
