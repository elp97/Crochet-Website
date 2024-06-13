using Crochet_Website.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Crochet_Website.Server.Data
{
    public class DataContext : DbContext 
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Image> Images { get; set; }
    }
}
