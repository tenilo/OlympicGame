using FluentValidation;
using System.Text.RegularExpressions;
using webapi.Models.DTO;

namespace webapi.Validation
{
    public class CommandDtoValidation : AbstractValidator<CommandDto>
    {
        public CommandDtoValidation()
        {
            RuleFor(m => m.Resume).NotEmpty().WithMessage("Your resume cannot be empty").MaximumLength(2000);
            RuleFor(m => m.Date).NotEmpty().WithMessage("Your date cannot be empty")
                .Must((Command, b) => BeAValidDate(Command.Date)).WithMessage("Date of command is required");
            RuleFor(m => m.Total).NotEmpty().WithMessage("Your Total cannot be empty")
                .Must(x => double.TryParse(x.ToString(), out var val) && val > 0).WithMessage("Invalid Number.");
            
        }
    

        private bool BeAValidDate(DateTime date)
        {
            return !date.Equals(default(DateTime));
        }

        

    }
}
