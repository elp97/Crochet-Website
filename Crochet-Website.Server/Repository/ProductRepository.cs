using Crochet_Website.Server.Data;
using Crochet_Website.Server.Interfaces;
using Crochet_Website.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Crochet_Website.Server.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;

        public ProductRepository(DataContext context)
        {
            _context = context;
        }
        public Task<List<Product>> GetAllAsync()
        {
            return _context.Products.ToListAsync();
        }
        public Task<List<ProductTypeCount>> GetTypesAsync()
        {
            var productTypes = _context.Products.GroupBy(x => x.Type).Select(i => new ProductTypeCount { Type = i.Key, Count = i.Select(t => t.Type).Count() });
            return productTypes.ToListAsync();
        }
        public Task<List<Product>> GetProductDetailsByTypeAsync(string productType)
        {
            return _context.Products.Include(p => p.Images).Where(p => p.Type.ToLower() == productType.ToLower()).ToListAsync();
        }
    }
}
