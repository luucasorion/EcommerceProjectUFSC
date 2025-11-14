using EcommerceProjectUFSC.Application.Services.Cryptography;
using EcommerceProjectUFSC.Communication.Requests;
using EcommerceProjectUFSC.Communication.Responses;
using EcommerceProjectUFSC.Domain.Repositories.User;
using EcommerceProjectUFSC.Domain.Security.Tokens;
using EcommerceProjectUFSC.Exceptions.ExceptionsBase;

namespace EcommerceProjectUFSC.Application.UseCases.Login.DoLogin;

public class DoLoginUseCase : IDoLoginUseCase
{
    private readonly IUserReadOnlyRepository _repository;
    private readonly IAccessTokenGenerator _accessTokenGenerator;

    public DoLoginUseCase(IUserReadOnlyRepository repository, IAccessTokenGenerator accessTokenGenerator)
    {
        _repository = repository;
        _accessTokenGenerator = accessTokenGenerator;
    }

    public async Task<ResponseRegisteredUserJson> Execute(RequestLoginJson request)
    {
        var encryptedPassword = PasswordEncrypter.Encrypt(request.Password);

        var user = await _repository.GetByEmailAndPassword(request.Email, encryptedPassword);

        if (user is null)
        {
            throw new InvalidLoginException();
        }

        return new ResponseRegisteredUserJson
        {
            Name = user.Name,
            Tokens = new ResponseTokensJson
            {
                AccessToken = _accessTokenGenerator.Generate(user.UserIdentifier)
            } 
        };
    }
}

