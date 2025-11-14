using MyRecipeBook.Communication.Requests;

namespace EcommerceProjectUFSC.Application.UseCases.User.Update;

public interface IUpdateUserUseCase 
{
    public Task Execute(RequestUpdateUserJson request);
}