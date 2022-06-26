namespace PurchaseStatisticApp.Api.DTO
{
    public class PurchaseDto
    {
        public string Id { get; set;}

        public string Date { get; set; }

        public string Company { get; set; }

        public string ProductName { get; set; }

        public decimal Cost { get; set; }
    }
}
