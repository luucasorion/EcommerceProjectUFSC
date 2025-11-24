using EcommerceProjectUFSC.Communication.Requests;
using EcommerceProjectUFSC.Domain.Repositories;
using EcommerceProjectUFSC.Domain.Repositories.Product;
using EcommerceProjectUFSC.Domain.Repositories.User;
using EcommerceProjectUFSC.Exceptions.ExceptionsBase;

namespace EcommerceProjectUFSC.Application.UseCases.Products.Update;

public class UpdateProductUseCase : IUpdateProductUseCase
{
    private readonly IProductUpdateOnlyRepository _repository;
    private readonly IProductReadOnlyRepository _productReadonlyRepository;
    private readonly IUnitOfWork _unitOfWork;

    public UpdateProductUseCase(
        IProductUpdateOnlyRepository repository,
        IProductReadOnlyRepository productReadonlyRepository,
        IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _productReadonlyRepository = productReadonlyRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task Execute(RequestUpdateProductJson request)
    {
        await Validate(request);

        var product = await _productReadonlyRepository.GetById(request.Id);

        product.Title = request.Title;
        product.Description = request.Description;
        product.Price = request.Price;

        _repository.Update(product);

        await _unitOfWork.Commit();
    }

    private async Task Validate(RequestUpdateProductJson request)
    {
        var validator = new UpdateProductValidator();

        var result = await validator.ValidateAsync(request);

        if (result.IsValid == false)
        {
            var errorMessages = result.Errors.Select(error => error.ErrorMessage).ToList();

            throw new ErrorOnValidationException(errorMessages);
        }
    }
}