using AutoMapper;
using MyRecipeBook.Communication.Requests;
using MyRecipeBook.Communication.Responses;
using EcommerceProjectUFSC.Domain.Repositories;
using EcommerceProjectUFSC.Domain.Repositories.Recipe;
using EcommerceProjectUFSC.Domain.Repositories.User;
using MyRecipeBook.Exceptions.ExceptionsBase;

namespace EcommerceProjectUFSC.Application.UseCases.Recipe;

public class RegisterProductsUseCase : IRegisterProductsUseCase
{
    private readonly IRecipeWriteOnlyRepository _repository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    
    
    public RegisterProductsUseCase(IRecipeWriteOnlyRepository repository, IUnitOfWork unitOfWork, IMapper mapper)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }
    
    public async Task<ResponseRegisteredRecipeJson> Execute(RequestRecipeJson request)
    {
        Validate(request);
        
        var recipe = _mapper.Map<Domain.Entities.Recipe>(request);

        await _repository.Add(recipe);
        var mapperReturn = _mapper.Map<ResponseRegisteredRecipeJson>(recipe);
        
        await _unitOfWork.Commit();
        
        return mapperReturn;
    }

    private static void Validate(RequestRecipeJson request)
    {
        var result = new ProductsValidator().Validate(request);

        if (result.IsValid == false)
        {
            throw new ErrorOnValidationException(result.Errors.Select(e => e.ErrorMessage).ToList());
        }
    }
}