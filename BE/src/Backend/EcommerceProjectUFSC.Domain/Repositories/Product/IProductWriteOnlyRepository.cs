namespace EcommerceProjectUFSC.Domain.Repositories.Product;

public interface IProductWriteOnlyRepository
{
    public Task Add(Entities.Product product);
}