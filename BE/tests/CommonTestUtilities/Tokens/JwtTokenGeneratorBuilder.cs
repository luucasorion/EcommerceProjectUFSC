using EcommerceProjectUFSC.Domain.Security.Tokens;
using EcommerceProjectUFSC.Infrastructure.Security.Tokens.Access.Generator;

namespace CommonTestUtilities.Tokens;

public class JwtTokenGeneratorBuilder
{
    public static IAccessTokenGenerator Build()
    {
        return new JwtTokenGenerator(expirationTimeMinutes: 5, signingKey: "tttttttttttttttttttttttttttttttttttttttt");
    }
}