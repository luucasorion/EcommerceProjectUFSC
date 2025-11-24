using AutoMapper;
using EcommerceProjectUFSC.Application.UseCases.User.Profile;
using EcommerceProjectUFSC.Communication.Requests;
using EcommerceProjectUFSC.Communication.Responses;
using EcommerceProjectUFSC.Domain.Repositories;
using EcommerceProjectUFSC.Domain.Repositories.Product;
using EcommerceProjectUFSC.Domain.Repositories.User;
using EcommerceProjectUFSC.Domain.Services.LoggedUser;

namespace EcommerceProjectUFSC.Application.UseCases.Products;

public class DeleteProductUseCase : IDeleteProductUseCase
{
    private readonly IUnitOfWork  _unitOfWork;
    private readonly IProductReadOnlyRepository  _repository;
    private readonly IProductUpdateOnlyRepository  _updateOnlyRepository;
    
    public DeleteProductUseCase(
        IProductReadOnlyRepository repository,
        IProductUpdateOnlyRepository updateOnlyRepository,
        IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _updateOnlyRepository = updateOnlyRepository;
        _unitOfWork = unitOfWork;
    }
    public async Task Execute(RequestProductJson request)
    {
        var id = request.Id;

        var result = await _repository.GetById(id);
        result.Active = false;
        
        _updateOnlyRepository.Update(result);
        
        await _unitOfWork.Commit();
    }
}