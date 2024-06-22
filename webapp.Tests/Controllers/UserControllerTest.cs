using Castle.Core.Resource;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Newtonsoft.Json;
using System.Threading.Tasks;
using webapi.Controllers;
using webapi.Interfaces;
using webapi.Models.ApiModel;
using webapi.Models.DTO;

namespace webapp.Tests.Controllers
{
    public class UserControllerTest
    {
        private  Mock<IUserRepository> _MockClientRepository;
        private UserController _UserController;
        
        public UserControllerTest()
        {
            _MockClientRepository = new Mock<IUserRepository>();
            _UserController = new UserController(_MockClientRepository.Object);
            
        }

        [Fact]
        public async Task CreateUser_With_Succeffully()
        {
            //Arrange
            ClientDto clientDto = _MockClientDto(true);
            _MockClientRepository.Setup(x => x.CreateUser(It.IsAny<ClientDto>()));

            //Act
            var result = await _UserController.CreateUser(clientDto);

            //Assert
            Assert.NotNull(result);
            var response = Assert.IsType<NoContentResult>(result);
            Assert.Equal(StatusCodes.Status204NoContent, response.StatusCode);
        }

        [Fact]
        public async Task CreateUser_With_PasswordError()
        {
            //Arrange
            
            ClientDto clientDto = _MockClientDto(false);
            _MockClientRepository.Setup(x => x.CreateUser(It.IsAny<ClientDto>()));

            //Act
            var result = await _UserController.CreateUser(clientDto);

            //Assert
            Assert.NotNull(result);
            var response = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal(StatusCodes.Status400BadRequest, response.StatusCode);
            
        }

        [Fact]
        public async Task CreateUser_With_ServerError()
        {
            //Arrange
            
            ClientDto clientDto = _MockClientDto(true);
            _MockClientRepository.Setup(x => x.CreateUser(It.IsAny<ClientDto>())).Throws(new Exception());

            //Act
            var result = await _UserController.CreateUser(clientDto);

            //Assert
            Assert.NotNull(result);
            var response = Assert.IsType<ObjectResult>(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, response.StatusCode);
            Assert.Equal("Erreur interne à l'application", response.Value);
        }
        [Fact]
        public async Task Authenticate_With_Succeffully()
        {
            //Arrange
            
            User user = GetUser();
            AuthentificationDto authentification = _MockAuthentificationDto();
            _MockClientRepository.Setup(x => x.Authenticate(authentification.username,authentification.password)).ReturnsAsync(user);

            //Act
            var result = await _UserController.Authenticate(authentification);

            //Assert
            Assert.NotNull(result);
            var response = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
            var responseValue = Assert.IsType<UserDto>(response.Value);
            Assert.Equal(user.FirstName, responseValue.FirstName);
        }

        [Fact]
        public async Task Authenticate_With_BadRequest()
        {
            //Arrange
            string errorMessage = "Username or password is incorrect";
            User user = null;
            AuthentificationDto authentification = _MockAuthentificationDto();
            _MockClientRepository.Setup(x => x.Authenticate(authentification.username, authentification.password)).ReturnsAsync(user);

            //Act
            var result = await _UserController.Authenticate(authentification);

            //Assert
            Assert.NotNull(result);
            var response = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal(StatusCodes.Status400BadRequest, response.StatusCode);
            System.Reflection.PropertyInfo objectValue = response.Value.GetType().GetProperty("message");
            String error = (String)(objectValue.GetValue(response.Value, null));
            Assert.Equal(errorMessage, error);
        }

        [Fact]
        public async Task CommandValide_With_Succeffully()
        {
            //Arrange
            CommandDto command = GetCommand();
            _MockClientRepository.Setup(x => x.ValidCommand(It.IsAny<CommandDto>()));

            //Act
            var result = await _UserController.CommandValide(command);

            //Assert
            Assert.NotNull(result);
            var response = Assert.IsType<NoContentResult>(result);
            Assert.Equal(StatusCodes.Status204NoContent, response.StatusCode);
            _MockClientRepository.Verify((x => x.ValidCommand(It.IsAny<CommandDto>())),Times.Once);
        }

        [Fact]
        public async Task CommandValide_With_ServerError()
        {
            //Arrange
            CommandDto command = GetCommand();
            _MockClientRepository.Setup(x => x.ValidCommand(It.IsAny<CommandDto>())).Throws(new Exception());

            //Act
            var result = await _UserController.CommandValide(command);

            //Assert
            Assert.NotNull(result);
            var response = Assert.IsType<ObjectResult>(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, response.StatusCode);
            Assert.Equal("Erreur interne à l'application", response.Value);
            _MockClientRepository.Verify((x => x.ValidCommand(It.IsAny<CommandDto>())), Times.Once);
        }

        [Fact]
        public async Task CommandHisto_With_Succeffully()
        {
            //Arrange
            Historique historique = GetHistorique();
            _MockClientRepository.Setup(x => x.GetHistoCommand()).ReturnsAsync(historique);

            //Act
            var result = await _UserController.CommandHisto();
            ActionResult? actionResult = result.Result;

            //Assert
            Assert.NotNull(actionResult);
            var response = Assert.IsType<OkObjectResult>(actionResult);
            Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
            var responseValue = Assert.IsType<Historique>(response.Value);
            Assert.Equal(historique.Total, responseValue.Total);

        }

        [Fact]
        public async Task CommandHisto_With_BadRequest()
        {
            //Arrange
            Historique historique = GetHistorique();
            _MockClientRepository.Setup(x => x.GetHistoCommand()).Throws(new Exception());

            //Act
            var result = await _UserController.CommandHisto();
            ActionResult? actionResult = result.Result;

            //Assert
            Assert.NotNull(actionResult);
            var response = Assert.IsType<BadRequestObjectResult>(actionResult);
            Assert.Equal(StatusCodes.Status400BadRequest, response.StatusCode);

        }

        [Fact]
        public async Task GetQrCodeById_With_Succeffully()
        {
            //Arrange
            int id = 1;
            QrCode qrCode = GetqrCode();
            _MockClientRepository.Setup(x => x.GetQrCodeById(id)).ReturnsAsync(qrCode);

            //Act
            var result = await _UserController.GetQrCodeById(id);
            ActionResult? actionResult = result.Result;

            //Assert
            Assert.NotNull(actionResult);
            var response = Assert.IsType<OkObjectResult>(actionResult);
            Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
            var responseValue = Assert.IsType<QrCode>(response.Value);
            Assert.Equal(qrCode.CommandResume, responseValue.CommandResume);

        }

        [Fact]
        public async Task GetQrCodeById_With_ServerError()
        {
            //Arrange
            int id = 1;
            QrCode qrCode = GetqrCode();
            _MockClientRepository.Setup(x => x.GetQrCodeById(id)).Throws(new Exception());

            //Act
            var result = await _UserController.GetQrCodeById(id);
            ActionResult? actionResult = result.Result;

            //Assert
            Assert.NotNull(actionResult);
            var response = Assert.IsType<ObjectResult>(actionResult);
            Assert.Equal(StatusCodes.Status500InternalServerError, response.StatusCode);
            Assert.Equal("Erreur interne à l'application", response.Value);
            
        }

        private ClientDto _MockClientDto(bool check)
        {
            return new ClientDto()
            {
                FirstName = "Test",
                LastName = "Testo",
                Email = "testo@gmail.com",
                UserName = "Toto",
                Password = check ?"Password1234?" : "Password?"

            };
        }

        
        private AuthentificationDto _MockAuthentificationDto()
        {
            var authentification = new AuthentificationDto() { password = "Password123?", username = "toto"};
            return authentification;
        }

        private User GetUser()
        {
            return new User() 
            {
                FirstName = "Test",
                LastName = "Testo",
                Email = "testo@gmail.com",
                UserName = "Toto"
                
            };
        }

        private CommandDto GetCommand()
        {
            return new CommandDto()
            {
                Date = DateTime.Now,
                Total = 12.5,
                Resume = "test",
                Tickets = new[] { new Offre() { Access = 1, Description = "test", OfferId = 1 } },
                user = new User() { UserId = 1 }
            };
        }

        private Historique GetHistorique()
        {
            return new Historique()
            {
                Total = 55,
                Tickets = null,
            };
        } 

        private QrCode GetqrCode()
        {
            return new QrCode()
            {
                QrCodeId = 1,
                UserId = 1,
                FirstKey = Guid.NewGuid().ToString(),
                SecondKey = Guid.NewGuid().ToString(),
                FinalKey = Guid.NewGuid().ToString(),
                CommandResume = "test",

            };
        }
    }
}
