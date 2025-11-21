using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace EcommerceProjectUFSC.Infrastructure.Security.Tokens.Access;

public abstract class JwtTokenHandler
{
    protected SymmetricSecurityKey SecurityKey(string key)
    {
        var signingKeyBytes = Encoding.UTF8.GetBytes(key);
        
        return new SymmetricSecurityKey(signingKeyBytes);
    } 
}