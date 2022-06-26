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
using PurchaseStatisticApp.Api.DAL;
using System.Linq;

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

            string connectionString = Environment.GetEnvironmentVariable("COSMOS_DB_CONNECTION_STRING");
            string primaryKey = Environment.GetEnvironmentVariable("COSMOS_DB_PRIMARY_KEY");
            string dbName = Environment.GetEnvironmentVariable("COSMOS_DB_NAME");
            string containerName = Environment.GetEnvironmentVariable("COSMOS_DB_CONTAINER_NAME");

            CosmosDbRepository repository = new CosmosDbRepository(connectionString, primaryKey, dbName, containerName);
            var service = new PurchasesService(repository);
            IEnumerable<PurchaseDto> purchases = await service.GetPurchasesAsync();

            return new OkObjectResult(purchases);
        }
    }
}
