using EcommerceProjectUFSC.Communication.Requests;
using EcommerceProjectUFSC.Communication.Responses;

namespace EcommerceProjectUFSC.Application.UseCases.Products;

public interface IDeleteProductUseCase
{
    public Task Execute(long id);
} 