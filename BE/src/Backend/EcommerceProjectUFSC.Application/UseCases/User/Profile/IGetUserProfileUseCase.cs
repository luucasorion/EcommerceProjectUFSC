using EcommerceProjectUFSC.Communication.Responses;

namespace EcommerceProjectUFSC.Application.UseCases.User.Profile;

public interface IGetUserProfileUseCase
{
    public Task<ResponseUserProfileJson> Execute();
}