namespace EcommerceProjectUFSC.Domain.Repositories.Recipe;

public interface IProductsWriteOnlyRepository
{
    public Task Add(Entities.Product product);
}