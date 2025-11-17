using EcommerceProjectUFSC.Domain.Entities;
using EcommerceProjectUFSC.Domain.Repositories.Recipe;
using EcommerceProjectUFSC.Infrastructure.DataAcess;

namespace EcommerceProjectUFSC.Infrastructure.DataAccess.Repositories;

public class RecipeRepository : IRecipeWriteOnlyRepository
{
    private readonly MyRecipeBookDbContext _dbContext;
    
    public RecipeRepository(MyRecipeBookDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task Add(Products products)
    {
        await _dbContext.Recipes.AddAsync(products);
    }
}