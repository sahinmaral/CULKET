using CULKET.Backend.Core.DTOs;
using CULKET.Backend.Core.Models;

namespace CULKET.Backend.Core.Services
{
    public interface IDiscussionService : IService<Discussion,DiscussionDto>
    {
        CustomResponseDto<List<DiscussionDto>> GetAllByCreatedUserId(string id);
        CustomResponseDto<List<DiscussionDto>> GetAllByDetail();
    }
}
