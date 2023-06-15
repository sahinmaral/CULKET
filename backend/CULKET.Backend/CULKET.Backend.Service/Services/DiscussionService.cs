using AutoMapper;

using CULKET.Backend.Core.DTOs;
using CULKET.Backend.Core.Models;
using CULKET.Backend.Core.Repositories;
using CULKET.Backend.Core.Services;
using CULKET.Backend.Core.UnitOfWorks;

using Microsoft.AspNetCore.Http;

namespace CULKET.Backend.Service.Services
{
    public class DiscussionService : Service<Discussion, DiscussionDto>, IDiscussionService
    {
        private readonly IDiscussionRepository _discussionRepository;

        public DiscussionService(IGenericRepository<Discussion> repository, IUnitOfWork unitOfWork, IMapper mapper, IDiscussionRepository discussionRepository) : base(repository, unitOfWork, mapper)
        {
            _discussionRepository = discussionRepository;
        }

        public CustomResponseDto<List<DiscussionDto>> GetAllByDetail()
        {
            return CustomResponseDto<List<DiscussionDto>>.Success(StatusCodes.Status200OK, _mapper.Map<List<DiscussionDto>>(_discussionRepository.GetAllByDetail()));
        }

        public CustomResponseDto<List<DiscussionDto>> GetAllByCreatedUserId(string id)
        {
            return CustomResponseDto<List<DiscussionDto>>.Success(StatusCodes.Status200OK, _mapper.Map<List<DiscussionDto>>(_discussionRepository.GetAllByCreatedUserId(id)));
        }
    }
}
