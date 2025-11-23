using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using EcommerceProjectUFSC.Domain.Entities;
using EcommerceProjectUFSC.Domain.Security.Tokens;
using EcommerceProjectUFSC.Domain.Services.LoggedUser;
using EcommerceProjectUFSC.Infrastructure.DataAccess;


namespace EcommerceProjectUFSC.Infrastructure.Services.LoggedUser;

public class LoggedUser : ILoggedUser
{
    private readonly EcommerceProjectUFSCDbContext _dbContext;
    private readonly ITokenProvider  _tokenProvider;
    
    public LoggedUser(EcommerceProjectUFSCDbContext dbContext,  ITokenProvider tokenProvider)
    {
        _dbContext = dbContext;
        _tokenProvider = tokenProvider;
    }
    
    public async Task<User> User()
    {
        var token = _tokenProvider.Value();
        var tokenHandler = new JwtSecurityTokenHandler();

        var jwtSecurityToken = tokenHandler.ReadJwtToken(token);

        var identifier = jwtSecurityToken.Claims.First(c => c.Type == ClaimTypes.Sid).Value;
        var userIdentifier = Guid.Parse(identifier);
        
        return await _dbContext
            .Users
            .AsNoTracking()
            .FirstAsync(user => user.Active && user.UserIdentifier == userIdentifier);
    }
}