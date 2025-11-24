using EcommerceProjectUFSC.API.Attributes;
using EcommerceProjectUFSC.Application.UseCases.Products;
using EcommerceProjectUFSC.Application.UseCases.Products.Update;
using Microsoft.AspNetCore.Mvc;
using EcommerceProjectUFSC.Communication.Requests;
using EcommerceProjectUFSC.Communication.Responses;

namespace EcommerceProjectUFSC.API.Controllers;


public class ProductsController : EcommerceProjectUfscBaseController
{
    
    [HttpPost]
    [ProducesResponseType(typeof(ResponseRegisteredProductJson), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ResponseErrorJson), StatusCodes.Status400BadRequest)]

    [AuthenticatedUser]
    public async Task<IActionResult> Register(
        [FromServices] IRegisterProductsUseCase useCase,
        [FromBody] RequestRegisterProductJson request)
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
    
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(ResponseProductJson), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetProduct(
        [FromServices] IGetProductUseCase useCase,
        [FromRoute] long id)
    {
        var result = await useCase.Execute(id);
        
        return Ok(result);
    }    
    
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(ResponseErrorJson), StatusCodes.Status404NotFound)]
    [AuthenticatedUser]
    public async Task<IActionResult> Update(
        [FromServices] IUpdateProductUseCase useCase,
        [FromBody] RequestUpdateProductJson request)
    {
        await useCase.Execute(request);

        return NoContent();
    }
    
    [HttpDelete("{id}")]
    [ProducesResponseType( StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(ResponseErrorJson), StatusCodes.Status400BadRequest)]
    [AuthenticatedUser]
    public async Task<IActionResult> DeleteProduct(
        [FromServices] IDeleteProductUseCase useCase,
        [FromRoute] long id)
    {
        await useCase.Execute(id);
        
        return NoContent();
    }    
}