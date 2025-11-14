using MyRecipeBook.Communication.Requests;
using MyRecipeBook.Communication.Responses;

namespace EcommerceProjectUFSC.Application.UseCases.User.Register;

public interface IRegisterUserUseCase
{
    public Task<ResponseRegisteredUserJson> Execute(RequestRegisterUserJson request);
} 