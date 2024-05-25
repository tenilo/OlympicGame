using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using webapi.Interfaces;
using webapi.Models.ApiModel;
using webapi.Models.DTO;
using webapi.Validation;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _clientRepository;
        public UserController(IUserRepository clientRepository)
        {
            _clientRepository = clientRepository;
        }

        [Route("authentificate")]
        [HttpPost]
        public async Task<IActionResult> Authenticate([FromBody] AuthentificationDto obj)
        {
            try
            {
                string username = obj.username;
                string password = obj.password;
                var user = await _clientRepository.Authenticate(username, password);
                if (user == null) return BadRequest(new { message = "Username or password is incorrect" });

                var userDto = new UserDto()
                {
                    UserId = user.UserId,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    UserName = user.UserName,
                    Email = user.Email,
                    IsAdmin = user.IsAdmin,
                };
                return Ok(userDto);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erreur interne à l'application");
            }

        }
        [Route("NewUser")]
        [HttpPost]
        public async Task<ActionResult> CreateUser([FromBody] ClientDto user)
        {
            try
            {
                // validation
                var validation = new ClientDtoValidation();
                var validationResult = await validation.ValidateAsync(user);
                if (!validationResult.IsValid) return BadRequest(validationResult.Errors);
                _clientRepository.CreateUser(user);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erreur interne à l'application");
            }

        }
        [Route("Command")]
        [HttpPost]
        public async Task<ActionResult> CommandValide([FromBody] CommandDto command)
        {
            try
            {
                //validation
               var validation = new CommandDtoValidation();
                var validationResult = await validation.ValidateAsync(command);
                if (!validationResult.IsValid) return BadRequest(validationResult.Errors);
                 _clientRepository.ValidCommand(command);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erreur interne à l'application");
            }

        }

        [Route("CommadHistory")]
        [HttpGet]
        public async Task<ActionResult<Historique>> CommandHisto()
        {
            try
            {
                var result = await _clientRepository.GetHistoCommand();
                return Ok(result); 
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("QrCodeById")]
        [HttpGet]
        public async Task<ActionResult<QrCode>> GetQrCodeById(int id)
        {
            try
            {
                var result = await _clientRepository.GetQrCodeById(id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erreur interne à l'application");
            }

        }
    }
}
