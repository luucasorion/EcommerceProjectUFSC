namespace EcommerceProjectUFSC.Domain.Repositories.User;

public interface IProductUpdateOnlyRepository
{
    public Task<Entities.Product> GetById(long id);

    public void Update(Entities.Product product);
}