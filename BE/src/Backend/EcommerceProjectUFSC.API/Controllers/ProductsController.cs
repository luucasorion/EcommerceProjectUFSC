using EcommerceProjectUFSC.API.Attributes;
using Microsoft.AspNetCore.Mvc;
using EcommerceProjectUFSC.Application.UseCases.Recipe;
using EcommerceProjectUFSC.Communication.Requests;
using EcommerceProjectUFSC.Communication.Responses;

namespace EcommerceProjectUFSC.API.Controllers;

[AuthenticatedUser]
public class ProductsController : EcommerceProjectUFSCBaseController
{
    [HttpPost]
    [ProducesResponseType(typeof(ResponseRegisteredRecipeJson), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ResponseErrorJson), StatusCodes.Status400BadRequest)]

    public async Task<IActionResult> Register(
        [FromServices] IRegisterProductsUseCase useCase,
        [FromBody] RequestRecipeJson request)
    {
        var response = await useCase.Execute(request);
        
        return Created(string.Empty, response);
    }

}