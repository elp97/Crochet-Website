using Crochet_Website.Server.Dtos.Product;
using Crochet_Website.Server.Models;

namespace Crochet_Website.Server.Mappers
{
    public static class ProductMappers
    {
        public static ProductDTO ToProductDTO(this Product productModel)
        {
            return new ProductDTO { 
                Name = productModel.Name, 
                ProductID = productModel.ProductID,
                Type = productModel.Type,
                Price = productModel.Price,
                Description_Small = productModel.Description_Small,
                Description_Long = productModel.Description_Long
            };
        }

        public static ProductTypeCountDTO ToProductTypeCountDTO(this ProductTypeCount typeCountModel)
        {
            return new ProductTypeCountDTO { 
                Type = typeCountModel.Type, 
                Count = typeCountModel.Count 
            };
        }

        public static DetailedProductDTO ToDetailedProductDTO(this Product productModel)
        {
            return new DetailedProductDTO
            {
                Name = productModel.Name,
                ProductID = productModel.ProductID,
                Type = productModel.Type,
                Price = productModel.Price,
                Description_Small = productModel.Description_Small,
                Description_Long = productModel.Description_Long,
                Images = productModel.Images
            };
        }
    }
}
