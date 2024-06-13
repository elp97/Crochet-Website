namespace Crochet_Website.Server.Models
{
    public class Image
    {
        public required int ImageID { get; set; }
        public required int ProductID { get; set; }
        public required string ImageURL { get; set; }
    }
}
