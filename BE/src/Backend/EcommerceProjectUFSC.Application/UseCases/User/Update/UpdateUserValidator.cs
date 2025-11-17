using FluentValidation;
using EcommerceProjectUFSC.Communication.Requests;
using EcommerceProjectUFSC.Exceptions;

namespace EcommerceProjectUFSC.Application.UseCases.User.Update;

public class UpdateUserValidator : AbstractValidator<RequestUpdateUserJson>
{
    public UpdateUserValidator()
    {
        RuleFor(request => request.Name).NotEmpty().WithMessage(ResourceMessegesException.NAME_EMPTY);
        RuleFor(request => request.Email).NotEmpty().WithMessage(ResourceMessegesException.EMAIL_INVALID);
        RuleFor(request => request.Email).EmailAddress().WithMessage(ResourceMessegesException.EMAIL_INVALID);
    }
}