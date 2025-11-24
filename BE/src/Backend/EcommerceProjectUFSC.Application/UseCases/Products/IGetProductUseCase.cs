using EcommerceProjectUFSC.Communication.Requests;
using EcommerceProjectUFSC.Communication.Responses;

namespace EcommerceProjectUFSC.Application.UseCases.Products;

public interface IGetProductUseCase
{
    public Task<ResponseProductJson> Execute(long id);
}