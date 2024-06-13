using Crochet_Website.Server.Models;

namespace Crochet_Website.Server.Dtos.Product
{
    public class ProductDTO
    {
        public required int ProductID { get; set; }
        public required string Name { get; set; }
        public required string Type { get; set; }
        public string? Description_Small { get; set; }
        public string? Description_Long { get; set; }
        public double Price { get; set; }
    }

    public class ProductTypeCountDTO
    {
        public required string Type {  get; set; }
        public required int Count { get; set; }
    }

    public class DetailedProductDTO
    {
        public required int ProductID { get; set; }
        public required string Name { get; set; }
        public required string Type { get; set; }
        public string? Description_Small { get; set; }
        public string? Description_Long { get; set; }
        public double Price { get; set; }
        public List<Image> Images { get; set; } = new List<Image>();
    }
}
