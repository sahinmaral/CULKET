using CULKET.Backend.Core.DTOs;
using CULKET.Backend.Service.Exceptions;

using Microsoft.AspNetCore.Diagnostics;
using System.Text.Json;

namespace CULKET.Backend.WebAPI.Middlewares
{
    public static class UseCustomExceptionHandler
    {
        public static void UseCustomException(this IApplicationBuilder builder)
        {
            builder.UseExceptionHandler(options =>
            {
                options.Run(async context =>
                {
                    context.Response.ContentType = "application/json";
                    var exceptionFeature = context.Features.Get<IExceptionHandlerFeature>();

                    Console.WriteLine(exceptionFeature.Error);

                    int statusCode = exceptionFeature.Error switch
                    {
                        ClientSideException => 400,
                        NotAuthorizedException => 401,
                        NotFoundException => 404,
                        _ => 500
                    };

                    context.Response.StatusCode = statusCode;

                    var response = CustomResponseDto<NoContentDto>.Fail(statusCode, exceptionFeature.Error.Message);

                    await context.Response.WriteAsync(JsonSerializer.Serialize(response));
                });
            });
        }
    }
}
