using FluentValidation;
using EcommerceProjectUFSC.Communication.Requests;
using EcommerceProjectUFSC.Exceptions;

namespace EcommerceProjectUFSC.Application.UseCases.Products;

public class ProductsValidator : AbstractValidator<RequestRegisterProductJson>
{
    public ProductsValidator()
    {
        RuleFor(product => product.Title).NotEmpty().WithMessage(ResourceMessegesException.TITLE_EMPTY);
        
        RuleFor(product => product.Price)
            .NotNull().WithMessage(ResourceMessegesException.PRICE_EMPTY)
            .GreaterThan(0).WithMessage(ResourceMessegesException.PRICE_INVALID);

    }
}

