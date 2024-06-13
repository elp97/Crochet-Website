using static System.Net.Mime.MediaTypeNames;

namespace Crochet_Website.Server.Models
{
    public class Product
    {
        public required int ProductID { get; set; }
        public required string Name { get; set; }
        public required string Type { get; set; }
        public string? Description_Small { get; set; }
        public string? Description_Long { get; set;}
        public double Price { get; set;}
    }
    public class ProductTypeCount
    {
        public required string Type { get; set; }
        public required int Count { get; set; }
    }


}
