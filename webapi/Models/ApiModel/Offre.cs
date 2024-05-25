namespace webapi.Models.ApiModel
{
    public class Offre
    {
        public int OfferId { get; set; }
        public string? Type { get; set; }
        public int? Access { get; set; }
        public double? Price { get; set; }
        public string? Description { get; set; }
        public int Quantity { get; set; }
        
        
    }
}
