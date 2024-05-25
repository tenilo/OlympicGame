using FluentValidation;
using webapi.Models.ApiModel;


namespace webapi.Validation
{
    public class TicketValidation : AbstractValidator<Offre>
    {
        public TicketValidation() 
        {
            RuleFor(m => m.Type).NotEmpty().WithMessage("Your type cannot be empty").MaximumLength(50);
            RuleFor(m => m.Description).NotEmpty().WithMessage("Your description cannot be empty").MaximumLength(50);
            RuleFor(m => m.Price).NotEmpty().WithMessage("Your prise cannot be empty")
                .Must(x => double.TryParse(x.ToString(), out var val) && val > 0).WithMessage("Invalid Number.");


        }
    }
}
