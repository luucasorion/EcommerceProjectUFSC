using MyRecipeBook.Communication.Requests;
using MyRecipeBook.Communication.Responses;

namespace EcommerceProjectUFSC.Application.UseCases.Login.DoLogin;

public interface IDoLoginUseCase
{
    public Task<ResponseRegisteredUserJson> Execute(RequestLoginJson request);
}