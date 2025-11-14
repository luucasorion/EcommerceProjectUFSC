using FluentValidation;
using EcommerceProjectUFSC.Communication.Requests;
using EcommerceProjectUFSC.Exceptions;

namespace EcommerceProjectUFSC.Application.UseCases.Recipe;

public class ProductsValidator : AbstractValidator<RequestRecipeJson>
{
    public ProductsValidator()
    {
        RuleFor(recipe => recipe.Title).NotEmpty().WithMessage(ResourceMessegesException.TITLE_EMPTY);
        
        RuleFor(recipe => recipe.Price)
            .NotNull().WithMessage(ResourceMessegesException.PRICE_EMPTY)
            .GreaterThan(0).WithMessage(ResourceMessegesException.PRICE_INVALID);

    }
}

