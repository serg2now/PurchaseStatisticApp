using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Linq;

namespace PurchaseStatisticApp.Api.DAL
{
    public class CosmosDbRepository
    {
        private readonly Container _container;

        public CosmosDbRepository(string connectionString, string primaryKey, string dbName, string containerName)
        {
            CosmosClient cosmosClient = new CosmosClient(connectionString, primaryKey);
            _container = cosmosClient.GetContainer(dbName, containerName);
        }

        public async Task<IEnumerable<PurchaseDao>> GetPurchasesAsync()
        {
            var query = _container.GetItemLinqQueryable<PurchaseDao>();
            var iterator = query.ToFeedIterator();
            var purchases = await iterator.ReadNextAsync();
            
            return purchases.Resource;
        }
    }
}