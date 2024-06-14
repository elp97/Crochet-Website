using Crochet_Website.Server.Controllers;
using Crochet_Website.Server.Interfaces;
using Crochet_Website.Server.Models;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Crochet_Website.ServerTests.Controller
{
    public class ProductControllerTests
    {
        private ProductController _productController;
        private IProductRepository _productRepo;
        public ProductControllerTests()
        {
            _productRepo = A.Fake<IProductRepository>();
            _productController = new ProductController(_productRepo);
        }

        [Fact]
        public void ProductController_GetAll_ReturnSuccess()
        {
            //Act
            var products = A.Fake<List<Product>>();
            A.CallTo(() => _productRepo.GetAllAsync()).Returns(products);

            //Arrange
            var result = _productController.GetAll();

            //Assert
            result.Should().BeOfType<Task<IActionResult>>();
        }

        [Fact]
        public void ProductController_GetTypes_ReturnSuccess()
        {
            //Act
            var types = A.Fake<List<ProductTypeCount>>();
            A.CallTo(() => _productRepo.GetTypesAsync()).Returns(types);

            //Arrange
            var result = _productController.GetTypes();

            //Assert
            result.Should().BeOfType<Task<IActionResult>>();
        }

        [Fact]
        public void ProductController_GetProductDetailsByType_ReturnSuccess()
        {
            //Act
            string productType = "test";
            var products = A.Fake<List<Product>>();
            A.CallTo(() => _productRepo.GetProductDetailsByTypeAsync(productType)).Returns(products);

            //Arrange
            var result = _productController.GetProductDetailsByType(productType);

            //Assert
            result.Should().BeOfType<Task<IActionResult>>();
        }
    }
}
