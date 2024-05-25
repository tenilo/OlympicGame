namespace webapi.Models.DTO
{
    public class QrCode
    {
        public int QrCodeId { get; set; }   
        public int UserId { get; set; }
        public string FirstKey { get; set; }
        public string SecondKey { get; set; }
        public string FinalKey { get; set; }
        public string CommandResume { get; set; }
    }
}
