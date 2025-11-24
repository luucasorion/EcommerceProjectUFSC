using EcommerceProjectUFSC.Communication.Requests;
using EcommerceProjectUFSC.Exceptions;
using FluentValidation;

namespace EcommerceProjectUFSC.Application.UseCases.Products.Update;

public class UpdateProductValidator : AbstractValidator<RequestUpdateProductJson>
{
    public UpdateProductValidator()
    {
        RuleFor(request => request.Title).NotEmpty().WithMessage(ResourceMessegesException.TITLE_EMPTY);
        
        RuleFor(product => product.Price)
            .NotNull().WithMessage(ResourceMessegesException.PRICE_EMPTY)
            .GreaterThan(0).WithMessage(ResourceMessegesException.PRICE_INVALID);
    }
}