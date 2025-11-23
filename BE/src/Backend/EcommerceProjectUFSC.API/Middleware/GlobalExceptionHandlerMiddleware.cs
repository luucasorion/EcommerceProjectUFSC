using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System;
using EcommerceProjectUFSC.Communication.Responses;
using EcommerceProjectUFSC.Exceptions;

namespace EcommerceProjectUFSC.API.Middleware;

public class GlobalExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;

    public GlobalExceptionHandlerMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            
            var errorResponse = new ResponseErrorJson(ResourceMessegesException.UNKNOWN_ERROR);
            
            await context.Response.WriteAsJsonAsync(errorResponse);
        }
    }
}