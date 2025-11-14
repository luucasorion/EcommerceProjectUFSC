using EcommerceProjectUFSC.Domain.Entities;
using EcommerceProjectUFSC.Domain.Repositories.Recipe;
using MyRecipeBook.Infrastructure.DataAcess;

namespace MyRecipeBook.Infrastructure.DataAccess.Repositories;

public class RecipeRepository : IRecipeWriteOnlyRepository
{
    private readonly MyRecipeBookDbContext _dbContext;
    
    public RecipeRepository(MyRecipeBookDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task Add(Recipe recipe)
    {
        await _dbContext.Recipes.AddAsync(recipe);
    }
}