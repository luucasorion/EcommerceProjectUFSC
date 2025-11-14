using Microsoft.EntityFrameworkCore;
using EcommerceProjectUFSC.Domain.Entities;

namespace EcommerceProjectUFSC.Infrastructure.DataAcess;

public class MyRecipeBookDbContext : DbContext
{
    public MyRecipeBookDbContext(DbContextOptions options) : base(options)
    {
    }
    
    public DbSet<User> Users { get; set; }
    
    public DbSet<Products> Recipes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(MyRecipeBookDbContext).Assembly);
    }
}