namespace webapi.Models.ApiModel
{
    public class User
    {
        public int UserId { get; set; }
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public byte[]? PassWordHash { get; set; }
        public byte[]? PassWordSalt { get; set; }
        public bool IsAdmin { get; set; }

    }
}
