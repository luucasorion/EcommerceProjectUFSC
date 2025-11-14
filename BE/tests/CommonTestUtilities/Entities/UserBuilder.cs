using Bogus;
using CommonTestUtilities.Cryptography;
using EcommerceProjectUFSC.Application.Services.Cryptography;
using MyRecipeBook.Domain.Entities;

namespace CommonTestUtilities.Entities;

public class UserBuilder
{
    public static (User user, string password) Build()
    {
        var passwordEncrypter = PasswordEncrypterBuilder.Build();
        
        var password = new Faker().Internet.Password();

        var user = new Faker<User>()
            .RuleFor(u => u.Id, () => 1)
            .RuleFor(u => u.Name, (f) => f.Person.FirstName)
            .RuleFor(u => u.Email, (f, u) => f.Internet.Email(u.Name))
            .RuleFor(u => u.UserIdentifier, f => Guid.NewGuid())
            .RuleFor(u => u.Password, (f) => PasswordEncrypter.Encrypt(password));
        
        return (user, password);
    }
}