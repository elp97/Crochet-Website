using Crochet_Website.Server.Data;
using Crochet_Website.Server.Interfaces;
using Crochet_Website.Server.Models;
using Crochet_Website.Server.Repository;
using FakeItEasy;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Crochet_Website.ServerTests.Repository
{
    public class ProductRepositoryTests
    {
        private async Task<DataContext> GetDBContext()
        {
            var options = new DbContextOptionsBuilder<DataContext>()
              .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
              .EnableSensitiveDataLogging()
              .Options;
            var databaseContext = new DataContext(options);
            databaseContext.Database.EnsureCreated();
            if (await databaseContext.Products.CountAsync() <= 0)
            {
                for (int i = 1; i <= 11; i++)
                {
                    Product product = new Product()
                    {
                        ProductID = i,
                        Name = "Test Product",
                        Type = "Test",
                        Price = 99.99,
                        Description_Small = "Small description",
                        Description_Long = "Long Description"
                    };
                    databaseContext.Products.Add(product);
                    await databaseContext.SaveChangesAsync();
                }
            }
            if (await databaseContext.Images.CountAsync() <= 0)
            {
                Image image = new Image
                {
                    ImageID = 1,
                    ProductID = 1,
                    ImageURL = "test.png"
                };
                databaseContext.Images.Add(image);
                await databaseContext.SaveChangesAsync();
            }
            return databaseContext;

        }

        [Fact]
        public async void ProductRepository_GetAllAsync_ReturnProduct()
        {
            //Act
            var dbContext = await GetDBContext();
            var productRepo = new ProductRepository(dbContext);

            //Arrange
            var result = productRepo.GetAllAsync();

            //Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<Task<List<Product>>>();
        }

        [Fact]
        public async void ProductRepository_GetTypesAsync_ReturnTypes()
        {
            //Act
            var dbContext = await GetDBContext();
            var productRepo = new ProductRepository(dbContext);

            //Arrange
            var result = productRepo.GetTypesAsync();

            //Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<Task<List<ProductTypeCount>>>();
        }

        [Fact]
        public async void ProductRepository_GetProductDetailsByTypeAsync_ReturnProducts()
        {
            //Act
            string productType = "test";
            var dbContext = await GetDBContext();
            var productRepo = new ProductRepository(dbContext);

            //Arrange
            var result = productRepo.GetProductDetailsByTypeAsync(productType);

            //Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<Task<List<Product>>>();
        }
    }
}
