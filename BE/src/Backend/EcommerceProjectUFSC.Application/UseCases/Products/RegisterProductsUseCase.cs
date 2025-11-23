using AutoMapper;
using EcommerceProjectUFSC.Communication.Requests;
using EcommerceProjectUFSC.Communication.Responses;
using EcommerceProjectUFSC.Domain.Repositories;
using EcommerceProjectUFSC.Domain.Repositories.Product;
using EcommerceProjectUFSC.Exceptions.ExceptionsBase;

namespace EcommerceProjectUFSC.Application.UseCases.Products;

public class RegisterProductsUseCase : IRegisterProductsUseCase
{
    private readonly IProductsWriteOnlyRepository _repository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    
    
    public RegisterProductsUseCase(IProductsWriteOnlyRepository repository, IUnitOfWork unitOfWork, IMapper mapper)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }
    
    public async Task<ResponseRegisteredProductJson> Execute(RequestProductsJson request)
    {
        Validate(request);
        
        var product = _mapper.Map<Domain.Entities.Product>(request);

        await _repository.Add(product);
        var mapperReturn = _mapper.Map<ResponseRegisteredProductJson>(product);
        
        await _unitOfWork.Commit();
        
        return mapperReturn;
    }

    private static void Validate(RequestProductsJson request)
    {
        var result = new ProductsValidator().Validate(request);

        if (result.IsValid == false)
        {
            throw new ErrorOnValidationException(result.Errors.Select(e => e.ErrorMessage).ToList());
        }
    }
}