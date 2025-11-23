using EcommerceProjectUFSC.Communication.Requests;
using EcommerceProjectUFSC.Communication.Responses;
using EcommerceProjectUFSC.Domain.Repositories.Product;

namespace EcommerceProjectUFSC.Application.UseCases.Products;

public class GetProductsUseCase : IGetProductsUseCase
{
    private IProductReadOnlyRepository _repository;

    public GetProductsUseCase(IProductReadOnlyRepository repository)
    {   
        _repository = repository;
    }
    public async Task<ResponseGetProductJson> Execute(RequestGetProductsJson request)
    {
        var (products, totalCount) = await _repository.GetPagedAsync(
            request.Page,
            request.PageSize
        );

        return new ResponseGetProductJson
        {
            Page = request.Page,
            PageSize = request.PageSize,
            TotalItems = totalCount,
            Items = products.Select(p => new ResponseProductJson
            {
                Title = p.Title,
                Description = p.Description,
                Price = p.Price
            }).ToList()
        };
    }
}