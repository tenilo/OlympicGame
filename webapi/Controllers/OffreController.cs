using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using OlympicGame.Interfaces;
using System.Collections.Generic;
using webapi.Models.ApiModel;
using webapi.Models.DTO;
using webapi.Validation;

namespace OlympicGame.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OffreController : ControllerBase
    {
        private readonly IOffreRepository _repository;
        public OffreController(IOffreRepository repository)
        {
            _repository = repository;
        }

        

        [Route("AllOffres")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Offre>>> GetAllOffres()
        {
            try
            {
                IEnumerable<Offre> result = await _repository.GetAll();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("CreateNewOffre")]
        [HttpPost]
        public async Task<IActionResult> CreateOffre([FromBody] OffreDto ticket)
        {
            try
            {
                // validation
                var validation = new TicketDtoValidation();
                var validationResult = await validation.ValidateAsync(ticket);
                if (!validationResult.IsValid) return BadRequest(validationResult.Errors);
                if (ticket == null)
                {
                    return Content("Invalid Submission!");
                }
                _repository.Create(ticket);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erreur interne à l'application");
            }
        }

        [Route("UpdateOffre")]
        [HttpPut]
        public async Task<IActionResult> UpdateOffre([FromBody] Offre ticket)
        {
            try
            {
                // validation
                var validation = new TicketValidation();
                var validationResult = await validation.ValidateAsync(ticket);
                if (!validationResult.IsValid) return BadRequest(validationResult.Errors);
                if (ticket == null)
                {
                    return Content("Invalid Submission!");
                }
                _repository.Update(ticket);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erreur interne à l'application");
            }
        }

        [Route("DeleteOffre")]
        [HttpDelete]
        public async Task<IActionResult> DeleteOffre(int id)
        {
            try
            {
                _repository.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erreur interne à l'application");
            }

        }

        
    }
}
