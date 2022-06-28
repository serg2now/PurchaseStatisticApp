using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Azure.WebJobs.Extensions.WebPubSub;

namespace PurchaseStatisticApp.Api
{
    public static class Negotiate
    {
        [FunctionName("Negotiate")]
        public static WebPubSubConnection Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = "negotiate")] HttpRequest req,
            [WebPubSubConnection(Hub = "vendingNotifications")] WebPubSubConnection connection,
            ILogger log)
        {
            log.LogInformation("Connecting...");

            return connection;
        }
    }
}
