using CULKET.Backend.Core.DTOs;
using CULKET.Backend.Core.Models;
using CULKET.Backend.Core.Services;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace CULKET.Backend.WebAPI.Filters
{
    public class NotFoundFilter<TEntity,TDto> : IAsyncActionFilter 
        where TDto : BaseDto, new()
        where TEntity : BaseEntity, new()
    {
        private readonly IService<TEntity,TDto> _service;

        public NotFoundFilter(IService<TEntity,TDto> service)
        {
            _service = service;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var entityIdValue = context.ActionArguments.Values.FirstOrDefault();
            if (entityIdValue == null)
            {
                await next();
                return;
            }

            if (entityIdValue is IEnumerable<int>)
            {
                var entityIds = (IEnumerable<int>)entityIdValue;

                List<int> notFoundEntities = new List<int>();
                foreach (var entityId in entityIds)
                {
                    var anyEntity = await _service.AnyAsync(x => x.Id == entityId);
                    if (!anyEntity.Data) notFoundEntities.Add(entityId);
                }

                if (notFoundEntities.Count == 0)
                {
                    await next();
                    return;
                }

                context.Result = new NotFoundObjectResult(CustomResponseDto<NoContentDto>.Fail(404, $"{typeof(TEntity).Name} not found with [{string.Join(",", notFoundEntities)}] ids"));
            }
            else
            {
                var entityId = (int)entityIdValue;
                var anyEntity = await _service.AnyAsync(x => x.Id == entityId);
                if (anyEntity.Data)
                {
                    await next();
                    return;
                }

                context.Result = new NotFoundObjectResult(CustomResponseDto<NoContentDto>.Fail(404, $"{typeof(TEntity).Name} not found with {entityId} id"));
            }


        }
    }
}
