using AutoMapper;
using EcommerceProjectUFSC.Application.UseCases.User.Profile;
using EcommerceProjectUFSC.Communication.Requests;
using EcommerceProjectUFSC.Communication.Responses;
using EcommerceProjectUFSC.Domain.Repositories.Product;
using EcommerceProjectUFSC.Domain.Services.LoggedUser;
using EcommerceProjectUFSC.Exceptions;
using EcommerceProjectUFSC.Exceptions.ExceptionsBase;

namespace EcommerceProjectUFSC.Application.UseCases.Products;

public class GetProductUseCase : IGetProductUseCase
{
    private readonly IMapper  _mapper;
    private readonly IProductReadOnlyRepository  _repository;
    
    public GetProductUseCase(IMapper mapper, IProductReadOnlyRepository repository)
    {
        _mapper = mapper;
        _repository = repository;
    }
    public async Task<ResponseProductJson> Execute(RequestProductJson request)
    {
        var id = request.Id;

        var result = await _repository.GetById(id);

        if (result is null)
            throw new ProductNotFound();

        return _mapper.Map<ResponseProductJson>(result);
    }
}