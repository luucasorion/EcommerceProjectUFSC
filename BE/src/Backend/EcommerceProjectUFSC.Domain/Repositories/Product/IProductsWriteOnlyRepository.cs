namespace EcommerceProjectUFSC.Domain.Repositories.Product;

public interface IProductsWriteOnlyRepository
{
    public Task Add(Entities.Product product);
}