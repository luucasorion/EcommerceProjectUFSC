using EcommerceProjectUFSC.Domain.Entities;
using EcommerceProjectUFSC.Domain.Repositories.Recipe;
using EcommerceProjectUFSC.Infrastructure.DataAcess;

namespace EcommerceProjectUFSC.Infrastructure.DataAccess.Repositories;

public class RecipeRepository : IRecipeWriteOnlyRepository
{
    private readonly EcommerceProjectUFSCDbContext _dbContext;
    
    public RecipeRepository(EcommerceProjectUFSCDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task Add(Products products)
    {
        await _dbContext.Recipes.AddAsync(products);
    }
}