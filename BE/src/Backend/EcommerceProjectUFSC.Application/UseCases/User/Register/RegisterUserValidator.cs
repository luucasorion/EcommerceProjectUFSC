using FluentValidation;
using EcommerceProjectUFSC.Communication.Requests;
using EcommerceProjectUFSC.Exceptions;

namespace EcommerceProjectUFSC.Application.UseCases.User.Register;

public class RegisterUserValidator : AbstractValidator<RequestRegisterUserJson>
{
    public RegisterUserValidator()
    {
        RuleFor(user => user.Name).NotEmpty().WithMessage(ResourceMessegesException.NAME_EMPTY);
        RuleFor(user => user.Email).EmailAddress().WithMessage(ResourceMessegesException.EMAIL_INVALID);
        RuleFor(user => user.Password.Length).GreaterThanOrEqualTo(6).WithMessage(ResourceMessegesException.PASSWORD_INVALID);
    }
}