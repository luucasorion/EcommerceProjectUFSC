using EcommerceProjectUFSC.Domain.Entities;
using EcommerceProjectUFSC.Domain.Repositories.Product;
using EcommerceProjectUFSC.Domain.Repositories.User;
using Microsoft.EntityFrameworkCore;

namespace EcommerceProjectUFSC.Infrastructure.DataAccess.Repositories;

public class ProductRepository : IProductWriteOnlyRepository, IProductReadOnlyRepository, IProductUpdateOnlyRepository
{
    private readonly EcommerceProjectUFSCDbContext _dbContext;
    
    public ProductRepository(EcommerceProjectUFSCDbContext dbContext)
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
    public async Task<Product> GetById(long id)
    {
        return await _dbContext
            .Product
            .SingleOrDefaultAsync(product => product.Id == id && product.Active);
    }

    public void Update(Product product)
    {
        _dbContext.Product.Update(product);
    }
}