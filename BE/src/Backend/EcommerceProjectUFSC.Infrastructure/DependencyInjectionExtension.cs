using System.Reflection;
using FluentMigrator.Runner;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using EcommerceProjectUFSC.Domain.Repositories;
using EcommerceProjectUFSC.Domain.Repositories.Recipe;
using EcommerceProjectUFSC.Domain.Repositories.User;
using EcommerceProjectUFSC.Domain.Security.Tokens;
using EcommerceProjectUFSC.Domain.Services.LoggedUser;
using EcommerceProjectUFSC.Infrastructure.DataAccess.Repositories;
using EcommerceProjectUFSC.Infrastructure.DataAcess;
using EcommerceProjectUFSC.Infrastructure.Extensions;
using EcommerceProjectUFSC.Infrastructure.DataAcess.Repositories;
using EcommerceProjectUFSC.Infrastructure.Security.Tokens.Access.Generator;
using EcommerceProjectUFSC.Infrastructure.Security.Tokens.Access.Validator;
using EcommerceProjectUFSC.Infrastructure.Services.LoggedUser;

namespace EcommerceProjectUFSC.Infrastructure;

public static class DependencyInjectionExtension
{
    public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        AddRepositories(services);
        AddLoggedUser(services);
        AddTokens(services, configuration);

        if (configuration.IsUnitTestEnviroment())
        {
            return;
        }

        AddDbContext(services, configuration);
        AddFluentMigrator(services, configuration);
    }

    private static void AddDbContext(IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.ConnectionString();

        services.AddDbContext<EcommerceProjectUFSCDbContext>(dbContextOptions =>
        {
            dbContextOptions.UseSqlServer(connectionString);
        });
    }

    private static void AddRepositories(IServiceCollection services)
    {
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<IUserWriteOnlyRepository, UserRepository>();
        services.AddScoped<IUserReadOnlyRepository, UserRepository>();
        services.AddScoped<IUserUpdateOnlyRepository, UserRepository>();
        services.AddScoped<IRecipeWriteOnlyRepository, RecipeRepository>();
    }

    private static void AddFluentMigrator(IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.ConnectionString();

        services.AddFluentMigratorCore().ConfigureRunner(options =>
        {
            options
                .AddSqlServer()
                .WithGlobalConnectionString(connectionString)
                .ScanIn(Assembly.Load("EcommerceProjectUFSC.Infrastructure")).For.All();
        });
    }

    private static void AddTokens(IServiceCollection services, IConfiguration configuration)
    {
        var expirationTimeMinutes = configuration.GetValue<uint>("Settings:Jwt:ExpirationTimeMinutes");
        var signingKey = configuration.GetValue<string>("Settings:Jwt:SigningKey");

        services.AddScoped<IAccessTokenGenerator>(option => new JwtTokenGenerator(expirationTimeMinutes, signingKey!));
        services.AddScoped<IAccessTokenValidator>(options => new JwtTokenValidator(signingKey!));
    }

    private static void AddLoggedUser(IServiceCollection services)
    {
        services.AddScoped<ILoggedUser, LoggedUser>();
    }
}