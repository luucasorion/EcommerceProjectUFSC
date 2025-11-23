using EcommerceProjectUFSC.Communication.Requests;
using EcommerceProjectUFSC.Communication.Responses;

namespace EcommerceProjectUFSC.Application.UseCases.Products;

public interface IGetProductsUseCase
{
    public Task<ResponseGetProductJson> Execute(RequestGetProductsJson request);
} 