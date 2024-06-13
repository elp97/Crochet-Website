using Crochet_Website.Server.Models;

namespace Crochet_Website.Server.Interfaces
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAllAsync();
        Task<List<ProductTypeCount>> GetTypesAsync();
        Task<List<Product>> GetProductDetailsByTypeAsync(string productType);
    }
}
