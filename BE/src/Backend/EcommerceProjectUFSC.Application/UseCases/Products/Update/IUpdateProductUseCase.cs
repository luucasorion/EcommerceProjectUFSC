using EcommerceProjectUFSC.Communication.Requests;

namespace EcommerceProjectUFSC.Application.UseCases.Products.Update;

public interface IUpdateProductUseCase 
{
    public Task Execute(RequestUpdateProductJson request);
}