using MyRecipeBook.Communication.Requests;
using EcommerceProjectUFSC.Domain.Repositories;
using EcommerceProjectUFSC.Domain.Repositories.User;
using EcommerceProjectUFSC.Domain.Services.LoggedUser;
using MyRecipeBook.Exceptions;
using MyRecipeBook.Exceptions.ExceptionsBase;

namespace EcommerceProjectUFSC.Application.UseCases.User.Update;

public class UpdateUserUseCase : IUpdateUserUseCase
{
    private readonly ILoggedUser _loggedUser;
    private readonly IUserUpdateOnlyRepository _repository; 
    private readonly IUserReadOnlyRepository _userReadonlyRepository;
    private readonly IUnitOfWork _unitOfWork;
    
    public UpdateUserUseCase(
        ILoggedUser loggedUser,
        IUserUpdateOnlyRepository repository,
        IUserReadOnlyRepository userReadonlyRepository,
        IUnitOfWork unitOfWork)
    {
        _loggedUser = loggedUser;
        _repository = repository;
        _userReadonlyRepository = userReadonlyRepository;
        _unitOfWork = unitOfWork;
    }
    public async Task Execute(RequestUpdateUserJson request)
    {
        var loggedUser = await _loggedUser.User();
        
        await Validate(request, loggedUser.Email);
            
        var user = await _repository.GetById(loggedUser.Id);
        
        user.Name = request.Name;
        user.Email = request.Email;
        
        _repository.Update(user);

        await _unitOfWork.Commit();
    }

    private async Task Validate(RequestUpdateUserJson request, string currentEmail)
    {
        var validator = new UpdateUserValidator();

        var result = validator.Validate(request);

        if (currentEmail != request.Email)
        {
            var userExist = await _userReadonlyRepository.ExistActiveUserWithEmail(request.Email);
            if (userExist)
            {
                result.Errors.Add(new FluentValidation.Results.ValidationFailure("email", ResourceMessegesException.USER_ALREADY_REGISTERED) );
            }
        }

        if (result.IsValid == false)
        {
            var errorMessages = result.Errors.Select(error => error.ErrorMessage).ToList();

            throw new ErrorOnValidationException(errorMessages);
        }
    }
}