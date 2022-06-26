using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PurchaseStatisticApp.Api.DAL;
using PurchaseStatisticApp.Api.DTO;

namespace PurchaseStatisticApp.Api.Services
{
    public class PurchasesService
    {
        private readonly CosmosDbRepository _repository;

        public PurchasesService(CosmosDbRepository repository) =>
            _repository = repository;

        public async Task<IEnumerable<PurchaseDto>> GetPurchasesAsync()
        {
            IEnumerable<PurchaseDao> purchasesDaos = await _repository.GetPurchasesAsync();

            var purchasesDtos = purchasesDaos.Select(p => new PurchaseDto
            {
                Id = p.Id,
                Company = p.Company,
                ProductName = p.ProductName,
                Cost = p.Cost,
                Date = p.Date
            });

            return purchasesDtos;
        }
    }
}