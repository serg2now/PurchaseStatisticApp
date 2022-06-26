using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PurchaseStatisticApp.Api.DTO;

namespace PurchaseStatisticApp.Api.Services
{
    public class PurchasesService
    {
        public List<PurchaseDto> GetPurchasesAsync()
        {
            return new List<PurchaseDto>()
            {
                new PurchaseDto
                {
                    Id = "p1", 
                    ProductName = "Coca-cola",
                    Date = $"{DateTime.UtcNow:dd-MMM-yyyy}",
                    Company = "Cola",
                    Cost = 4.56M
                },
                new PurchaseDto
                {
                    Id = "p12", 
                    ProductName = "Fanta",
                    Date = $"{DateTime.UtcNow.AddDays(-1):dd-MMM-yyyy}",
                    Company = "Cola",
                    Cost = 2.12M
                },
                new PurchaseDto
                {
                    Id = "p13", 
                    ProductName = "Sprite",
                    Date = $"{DateTime.UtcNow.AddDays(-2):dd-MMM-yyyy}",
                    Company = "Cola",
                    Cost = 3.95M
                }
            };
        }
    }
}