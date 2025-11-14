using CommonTestUtilities.Entities;
using CommonTestUtilities.Repositories;
using CommonTestUtilities.Request;
using CommonTestUtilities.Tokens;
using FluentAssertions;
using EcommerceProjectUFSC.Application.UseCases.Login.DoLogin;
using MyRecipeBook.Communication.Requests;
using MyRecipeBook.Exceptions;
using MyRecipeBook.Exceptions.ExceptionsBase;

namespace UseCases.Test.Login.DoLogin;

public class DoLoginUseCaseTest
{
    [Fact]
    public async Task Success()
    {
        var (user, password) = UserBuilder.Build();
        var useCase = CreateUseCase(user);
        
        var result = await useCase.Execute(new RequestLoginJson
        {
            Email   = user.Email,
            Password =  password
        });

        result.Should().NotBeNull();
        result.Tokens.Should().NotBeNull();
        result.Tokens.AccessToken.Should().NotBeNullOrWhiteSpace();
        result.Name.Should().NotBeNullOrWhiteSpace().And.Be(user.Name);
    }
    
    [Fact]
    public async Task Error_Invalid_User()
    {
        var request = RequestLoginJsonBuilder.Build();
        var useCase = CreateUseCase();
        
        var act = async () =>  { await useCase.Execute(request); };

        await act.Should().ThrowAsync<InvalidLoginException>()
            .Where(e => e.Message.Equals(ResourceMessegesException.EMAIL_OR_PASSWORD_INVALID));
    }

    private static DoLoginUseCase CreateUseCase(MyRecipeBook.Domain.Entities.User? user = null)
    {
        var accessTokenGenerator = JwtTokenGeneratorBuilder.Build();
        var userReadOnlyRepositoryBuilder = new UserReadOnlyRepositoryBuilder();
        
        if (user is not null)
        {
            userReadOnlyRepositoryBuilder.GetByEmailAndPassword(user);
        }
        
        return new DoLoginUseCase(userReadOnlyRepositoryBuilder.Build(),  accessTokenGenerator);
    }
}
