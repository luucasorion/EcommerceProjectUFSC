namespace EcommerceProjectUFSC.Domain.Repositories.Product;

public interface IProductReadOnlyRepository
{
    Task<(IEnumerable<Entities.Product> Items, int TotalCount)> GetPagedAsync(  
        int page,
        int pageSize
    );

    Task<Entities.Product> GetById(long id);
}