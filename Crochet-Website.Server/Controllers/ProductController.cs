using Crochet_Website.Server.Data;
using Crochet_Website.Server.Interfaces;
using Crochet_Website.Server.Mappers;
using Crochet_Website.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Crochet_Website.Server.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController
    {
        private readonly IProductRepository _productRepo;

        public ProductController(IProductRepository productRepo)
        {
            _productRepo = productRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _productRepo.GetAllAsync();
            var productsDTO = products.Select(p => p.ToProductDTO());
            return new OkObjectResult(productsDTO);
        }

        [HttpGet("getTypes")]
        public async Task<IActionResult> GetTypes()
        {
            var types = await _productRepo.GetTypesAsync();
            var typesDTO = types.Select(t => t.ToProductTypeCountDTO());
            return new OkObjectResult(typesDTO);
        }
    }
}
