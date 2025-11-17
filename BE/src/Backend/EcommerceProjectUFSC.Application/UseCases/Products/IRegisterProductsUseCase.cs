using EcommerceProjectUFSC.Communication.Requests;
using EcommerceProjectUFSC.Communication.Responses;

namespace EcommerceProjectUFSC.Application.UseCases.Recipe;

public interface IRegisterProductsUseCase
{
    public Task<ResponseRegisteredRecipeJson> Execute(RequestRecipeJson request);
} 