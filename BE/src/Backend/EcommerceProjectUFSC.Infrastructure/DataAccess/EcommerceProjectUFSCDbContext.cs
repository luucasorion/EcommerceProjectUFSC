using Microsoft.EntityFrameworkCore;
using EcommerceProjectUFSC.Domain.Entities;

namespace EcommerceProjectUFSC.Infrastructure.DataAccess;

public class EcommerceProjectUFSCDbContext : DbContext
{
    public EcommerceProjectUFSCDbContext(DbContextOptions options) : base(options)
    {
    }
    
    public DbSet<User> Users { get; set; }
    
    public DbSet<Product> Product { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(EcommerceProjectUFSCDbContext).Assembly);
    }
}