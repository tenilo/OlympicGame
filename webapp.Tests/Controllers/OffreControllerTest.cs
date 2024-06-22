using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Moq;
using OlympicGame.Controllers;
using OlympicGame.Interfaces;
using System.Collections.Generic;
using webapi.Models.ApiModel;
using webapi.Models.DTO;

namespace webapp.Tests.Controllers
{
    public class OffreControllerTest
    {
        private Mock<IOffreRepository> _MockOffreRepository;
        private OffreController _OffreController;
        public OffreControllerTest()
        {
            _MockOffreRepository = new Mock<IOffreRepository>();
            _OffreController = new OffreController(_MockOffreRepository.Object);
            
        }
        [Fact]
        public async Task  GetAllOffres_WithOKCode()
        {
            var response =  someOffre();

            //Arrange
             _MockOffreRepository.Setup(x => x.GetAll()).ReturnsAsync(response);

            //Act 
            ActionResult<IEnumerable<Offre>> result =  await _OffreController.GetAllOffres();
            ActionResult? actionResult = result.Result;

            //Assert
            Assert.NotNull(result);
            var okResponse = Assert.IsType<OkObjectResult>(actionResult);
            Assert.Equal(StatusCodes.Status200OK, okResponse.StatusCode);
            var responseList = Assert.IsType<List<Offre>>(okResponse.Value);
            Assert.Equal(response, okResponse.Value);
        }

        [Fact]
        public async Task GetAllOffres_WithServerError()
        {
            //Arrange
            _MockOffreRepository.Setup(x => x.GetAll()).Throws(new Exception()); 

            //Act 
            ActionResult<IEnumerable<Offre>> result = await _OffreController.GetAllOffres();
            ActionResult? actionResult = result.Result;

            //Assert
            Assert.NotNull(result);
            var badRequestResponse = Assert.IsType<BadRequestObjectResult>(actionResult);
            Assert.Equal(StatusCodes.Status400BadRequest, badRequestResponse.StatusCode);
            
        }

        [Fact]
        public async Task CreateOffre_With_Successfully()
        {
            
            //Arrange
            OffreDto offre = _MockOffreDto();
            _MockOffreRepository.Setup(x => x.Create(It.IsAny<OffreDto>()));

            //Act 
            var result = await _OffreController.CreateOffre(offre);

            //Assert
            Assert.NotNull(result);
            var response = Assert.IsType<OkResult>(result);
            Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
        }

       
        [Fact]
        public async Task CreateOffre_With_ServerError()
        {

            //Arrange
            OffreDto offre = _MockOffreDto();
            _MockOffreRepository.Setup(x => x.Create(It.IsAny<OffreDto>())).Throws(new Exception());

            //Act 
            var result = await _OffreController.CreateOffre(offre);

            //Assert
            Assert.NotNull(result);
            var response = Assert.IsType<ObjectResult>(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, response.StatusCode);
            Assert.Equal("Erreur interne à l'application", response.Value);
        }

        [Fact]
        public async Task CreateOffre_With_Wrong_Parameter_And_Return_BadRequest()
        {

            //Arrange
            OffreDto offre = new OffreDto();
            _MockOffreRepository.Setup(x => x.Create(It.IsAny<OffreDto>()));

            //Act 
            var result = await _OffreController.CreateOffre(offre);

            //Assert
            Assert.NotNull(result);
            var response = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal(StatusCodes.Status400BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task CreateOffre_With_Wrong_Parameter_And_Return_Content()
        {

            //Arrange
            OffreDto offre = _MockOffreDto();
            _MockOffreRepository.Setup(x => x.Create(It.IsAny<OffreDto>()));

            //Act 
            var result = await _OffreController.CreateOffre(null);

            //Assert
            Assert.NotNull(result);
            var response = Assert.IsType<ContentResult>(result);
            Assert.Equal("Invalid Submission", response.Content);
        }

        [Fact]
        public async Task UpdateOffre_With_Successfully()
        {

            //Arrange
            Offre offre = _MockOffre();
            _MockOffreRepository.Setup(x => x.Update(It.IsAny<Offre>()));

            //Act 
            var result = await _OffreController.UpdateOffre(offre);

            //Assert
            Assert.NotNull(result);
            var response = Assert.IsType<OkResult>(result);
            Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
            _MockOffreRepository.Verify((x => x.Update(It.IsAny<Offre>())), Times.Once());
        }


        [Fact]
        public async Task UpdateOffre_With_ServerError()
        {

            //Arrange
            Offre offre = _MockOffre();
            _MockOffreRepository.Setup(x => x.Update(It.IsAny<Offre>())).Throws(new Exception());

            //Act 
            var result = await _OffreController.UpdateOffre(offre);

            //Assert
            Assert.NotNull(result);
            var response = Assert.IsType<ObjectResult>(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, response.StatusCode);
            Assert.Equal("Erreur interne à l'application", response.Value);
            _MockOffreRepository.Verify((x => x.Update(It.IsAny<Offre>())), Times.Once());
        }

        [Fact]
        public async Task DeleteOffre_With_Successfully()
        {

            //Arrange
            int id = 1;
            _MockOffreRepository.Setup(x => x.Delete(It.IsAny<int>()));

            //Act 
            var result = await _OffreController.DeleteOffre(id);

            //Assert
            Assert.NotNull(result);
            var response = Assert.IsType<OkResult>(result);
            Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
            _MockOffreRepository.Verify((x => x.Delete(It.IsAny<int>())), Times.Once());
        }


        [Fact]
        public async Task DeleteOffre_With_ServerError()
        {

            //Arrange
            int id = 1;
            _MockOffreRepository.Setup(x => x.Delete(It.IsAny<int>())).Throws(new Exception());

            //Act 
            var result = await _OffreController.DeleteOffre(id); ;

            //Assert
            Assert.NotNull(result);
            var response = Assert.IsType<ObjectResult>(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, response.StatusCode);
            Assert.Equal("Erreur interne à l'application", response.Value);
            _MockOffreRepository.Verify((x => x.Delete(It.IsAny<int>())), Times.Once());
        }



        private IEnumerable<Offre> someOffre()
        {
            List<Offre> offres = new List<Offre>();
            
            offres.Add(Mock.Of<Offre>());
            offres.Add(Mock.Of<Offre>());
            return offres;
        }

        private OffreDto _MockOffreDto()
        {
            return new OffreDto()
            {
                Access = 1,
                Description = "description",
                Price = 10,
                Type = "test"
            };
        }

        private Offre _MockOffre()
        {
            return new Offre()
            {
                OfferId = 1,
                Access = 1,
                Description = "description",
                Price = 10.5,
                Type = "test",
                Quantity = 10

            };
        }
    }
}
