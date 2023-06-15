using CULKET.Backend.Core.DTOs;
using CULKET.Backend.Core.Models;
using System.Linq.Expressions;

namespace CULKET.Backend.Core.Services
{
    public interface IService<TEntity, TDto>
        where TDto : BaseDto, new()
        where TEntity : BaseEntity, new()
    {
        Task<CustomResponseDto<IEnumerable<TDto>>> GetAllAsync();
        Task<CustomResponseDto<TDto>> GetByIdAsync(int id);
        Task<CustomResponseDto<IEnumerable<TDto>>> Where(Expression<Func<TEntity, bool>> expression);
        Task<CustomResponseDto<bool>> AnyAsync(Expression<Func<TEntity, bool>> expression);
        Task<CustomResponseDto<TDto>> AddAsync(TDto dto);
        Task<CustomResponseDto<IEnumerable<TDto>>> AddRangeAsync(IEnumerable<TDto> dtos);
        Task<CustomResponseDto<NoContentDto>> UpdateAsync(TDto dto);
        Task<CustomResponseDto<NoContentDto>> DeleteAsync(int id);
        Task<CustomResponseDto<NoContentDto>> DeleteRangeAsync(IEnumerable<int> ids);
    }
}
