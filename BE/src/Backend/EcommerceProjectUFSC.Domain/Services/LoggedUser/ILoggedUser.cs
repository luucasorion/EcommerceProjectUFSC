using EcommerceProjectUFSC.Domain.Entities;

namespace EcommerceProjectUFSC.Domain.Services.LoggedUser;

public interface ILoggedUser
{
    public Task<User> User();
}