using EcommerceProjectUFSC.Domain.Repositories;

namespace EcommerceProjectUFSC.Infrastructure.DataAcess;

public class UnitOfWork : IUnitOfWork
{
    private readonly EcommerceProjectUFSCDbContext _dbContext;

    public UnitOfWork(EcommerceProjectUFSCDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Commit()
    {
        await _dbContext.SaveChangesAsync();
    }
}