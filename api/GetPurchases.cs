using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using PurchaseStatisticApp.Api.DTO;
using PurchaseStatisticApp.Api.Services;

namespace PurchaseStatisticApp.Api
{
    public static class GetPurchases
    {
        [FunctionName("GetPurchases")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get",  Route = "purchases")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var service = new PurchasesService();
            List<PurchaseDto> purchases = service.GetPurchasesAsync();

            return new OkObjectResult(purchases);
        }
    }
}
