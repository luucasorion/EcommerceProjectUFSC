using EcommerceProjectUFSC.Communication.Requests;
using EcommerceProjectUFSC.Communication.Responses;

namespace EcommerceProjectUFSC.Application.UseCases.Products;

public interface IRegisterProductsUseCase
{
    public Task<ResponseRegisteredProductJson> Execute(RequestRegisterProductJson request);
} 