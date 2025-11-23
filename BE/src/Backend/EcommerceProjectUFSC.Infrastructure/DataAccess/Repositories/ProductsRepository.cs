using EcommerceProjectUFSC.Domain.Entities;
using EcommerceProjectUFSC.Domain.Repositories.Product;
using Microsoft.EntityFrameworkCore;

namespace EcommerceProjectUFSC.Infrastructure.DataAccess.Repositories;

public class ProductsRepository : IProductsWriteOnlyRepository, IProductReadOnlyRepository
{
    private readonly EcommerceProjectUFSCDbContext _dbContext;
    
    public ProductsRepository(EcommerceProjectUFSCDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task Add(Product product)
    {
        await _dbContext.Product.AddAsync(product);
    }


    public async Task<(IEnumerable<Product> Items, int TotalCount)> GetPagedAsync(int page, int pageSize)
    {
        var query = _dbContext.Product.Where(p => p.Active);

        var total = await query.CountAsync();

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, total);
    }
}