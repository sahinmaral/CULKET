using AutoMapper;

using CULKET.Backend.Core.DTOs;
using CULKET.Backend.Core.Models;
using CULKET.Backend.Core.Repositories;
using CULKET.Backend.Core.Services;
using CULKET.Backend.Core.UnitOfWorks;

namespace CULKET.Backend.Service.Services
{
    public class CommentService : Service<Comment, CommentDto>, ICommentService
    {
        public CommentService(IGenericRepository<Comment> repository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork, mapper)
        {
        }
    }
}
