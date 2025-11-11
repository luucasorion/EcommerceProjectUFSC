using CommonTestUtilities.Cryptography;
using CommonTestUtilities.Mapper;
using CommonTestUtilities.Repositories;
using CommonTestUtilities.Request;
using CommonTestUtilities.Tokens;
using FluentAssertions;
using MyRecipeBook.Application.UseCases.User.Register;
using MyRecipeBook.Domain.Security.Tokens;
using MyRecipeBook.Exceptions;
using MyRecipeBook.Exceptions.ExceptionsBase;
using MyRecipeBook.Infrastructure.Security.Tokens.Access.Generator;

namespace UseCases.Test.User.Register;

public class RegisterUserUseCaseTest
{
    [Fact]
    public async Task Success()
    {
        var request = RequestRegisterUserJsonBuilder.Build();

        var useCase = CreateUseCase();
        
        var result = await useCase.Execute(request);
        
        result.Should().NotBeNull();
        result.Tokens.Should().NotBeNull();
        result.Tokens.AccessToken.Should().NotBeNullOrWhiteSpace();
        result.Name.Should().Be(request.Name);
    }
    
    [Fact] 
    public async Task Error_Email_Already_Registered() 
        { 
            var request = RequestRegisterUserJsonBuilder.Build(); 
            var useCase = CreateUseCase(request.Email);
            
            Func<Task> act = async () => await useCase.Execute(request);

            (await act.Should().ThrowAsync<ErrorOnValidationException>())
                .Where(e => e.ErrorMessages.Count == 1 && e.ErrorMessages.Contains(ResourceMessegesException.USER_ALREADY_REGISTERED));
        }
    
    [Fact] 
    public async Task Error_Name_Empty() 
    { 
        var request = RequestRegisterUserJsonBuilder.Build(); 
        
        request.Name = string.Empty;
        
        var useCase = CreateUseCase();
            
        Func<Task> act = async () => await useCase.Execute(request);

        (await act.Should().ThrowAsync<ErrorOnValidationException>())
            .Where(e => e.ErrorMessages.Count == 1 && e.ErrorMessages.Contains(ResourceMessegesException.NAME_EMPTY));
    }
    private static RegisterUserUseCase CreateUseCase(string? email = null)
    {
        var mapper = MapperBuilder.Build();
        var accessTokenGenerator = JwtTokenGeneratorBuilder.Build();
        var unitOfWork = UnitOfWorkBuilder.Build();
        var writeRepository = UserWriteOnlyRepositoryBuilder.Build();
        var readRepositoryBuilder = new UserReadOnlyRepositoryBuilder();

        if (String.IsNullOrEmpty(email) == false)
        {
            readRepositoryBuilder.ExistAcitveUserWithEmail(email);
        }
     
        return new RegisterUserUseCase(writeRepository, readRepositoryBuilder.Build(), accessTokenGenerator, mapper, unitOfWork);   
    }
}