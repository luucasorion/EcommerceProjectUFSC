using MyRecipeBook.Communication.Requests;
using MyRecipeBook.Communication.Responses;

namespace EcommerceProjectUFSC.Application.UseCases.Recipe;

public interface IRegisterProductsUseCase
{
    public Task<ResponseRegisteredRecipeJson> Execute(RequestRecipeJson request);
} 