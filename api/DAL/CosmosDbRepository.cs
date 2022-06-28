using System.Collections.Generic;
using System.Linq;
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
            IOrderedQueryable<PurchaseDao> query = _container.GetItemLinqQueryable<PurchaseDao>();
            FeedIterator<PurchaseDao> iterator = query.ToFeedIterator();

            List<PurchaseDao> result = new();

            do
            {
                FeedResponse<PurchaseDao> purchases = await iterator.ReadNextAsync();

                result.AddRange(purchases.Resource);
            }
            while (iterator.HasMoreResults);

            return result;
        }
    }
}