using AutoMapper;
using EcommerceProjectUFSC.Application.Services.AutoMapper;
using EcommerceProjectUFSC.Application.Services.Cryptography;
using EcommerceProjectUFSC.Application.UseCases.Login.DoLogin;
using EcommerceProjectUFSC.Application.UseCases.Recipe;
using EcommerceProjectUFSC.Application.UseCases.User.Profile;
using EcommerceProjectUFSC.Application.UseCases.User.Register;
using EcommerceProjectUFSC.Application.UseCases.User.Update;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EcommerceProjectUFSC.Application;

public static class DependencyInjectionExtension
{
    public static void AddApplication(this IServiceCollection services, IConfiguration configuration)
    {
        AddAutoMapper(services);
        AddDPassword(services, configuration);
        AddUseCase(services);
    }

    private static void AddAutoMapper(IServiceCollection services)
    {
        var autoMapper = new MapperConfiguration(options => { options.AddProfile(new AutoMapping()); }).CreateMapper();

        services.AddScoped(options => autoMapper);
    }

    private static void AddUseCase(IServiceCollection services)
    {
        services.AddScoped<IRegisterUserUseCase, RegisterUserUseCase>();
        services.AddScoped<IDoLoginUseCase, DoLoginUseCase>();
        services.AddScoped<IGetUserProfileUseCase, GetUserProfileUseCase>();
        services.AddScoped<IUpdateUserUseCase, UpdateUserUseCase>();
        services.AddScoped<IRegisterRecipeUseCase, RegisterRecipeUseCase>();
    }

    private static void AddDPassword(IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped(option => new PasswordEncrypter());
    }
}