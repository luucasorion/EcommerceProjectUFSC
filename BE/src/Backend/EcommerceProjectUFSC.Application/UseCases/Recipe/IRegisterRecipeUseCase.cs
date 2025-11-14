using MyRecipeBook.Communication.Requests;
using MyRecipeBook.Communication.Responses;

namespace EcommerceProjectUFSC.Application.UseCases.Recipe;

public interface IRegisterRecipeUseCase
{
    public Task<ResponseRegisteredRecipeJson> Execute(RequestRecipeJson request);
} 