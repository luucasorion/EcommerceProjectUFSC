using EcommerceProjectUFSC.API.Attributes;
using EcommerceProjectUFSC.Application.UseCases.Products;
using Microsoft.AspNetCore.Mvc;
using EcommerceProjectUFSC.Application.UseCases.Recipe;
using EcommerceProjectUFSC.Communication.Requests;
using EcommerceProjectUFSC.Communication.Responses;

namespace EcommerceProjectUFSC.API.Controllers;


public class ProductsController : EcommerceProjectUfscBaseController
{
    
    [HttpPost]
    [ProducesResponseType(typeof(ResponseRegisteredRecipeJson), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ResponseErrorJson), StatusCodes.Status400BadRequest)]

    [AuthenticatedUser]
    public async Task<IActionResult> Register(
        [FromServices] IRegisterProductsUseCase useCase,
        [FromBody] RequestRecipeJson request)
    {
        var response = await useCase.Execute(request);
        
        return Created(string.Empty, response);
    }
    
    [HttpGet]
    [ProducesResponseType(typeof(ResponseGetProductJson), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ResponseErrorJson), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetProducts(
        [FromServices] IGetProductsUseCase useCase,
        [FromQuery] RequestGetProductsJson request)
    {
        var response = await useCase.Execute(request);
        
        return Ok(response);
    }

}