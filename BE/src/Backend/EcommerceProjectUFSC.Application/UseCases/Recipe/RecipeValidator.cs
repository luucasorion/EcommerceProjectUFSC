using FluentValidation;
using MyRecipeBook.Communication.Requests;
using MyRecipeBook.Exceptions;

namespace EcommerceProjectUFSC.Application.UseCases.Recipe;

public class RecipeValidator : AbstractValidator<RequestRecipeJson>
{
    public RecipeValidator()
    {
        RuleFor(recipe => recipe.Title).NotEmpty().WithMessage(ResourceMessegesException.TITLE_EMPTY);
        
        RuleFor(recipe => recipe.Price)
            .NotNull().WithMessage(ResourceMessegesException.PRICE_EMPTY)
            .GreaterThan(0).WithMessage(ResourceMessegesException.PRICE_INVALID);

    }
}

