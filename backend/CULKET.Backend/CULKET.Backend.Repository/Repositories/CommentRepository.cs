using CULKET.Backend.Core.Models;
using CULKET.Backend.Core.Repositories;

namespace CULKET.Backend.Repository.Repositories
{
    public class CommentRepository : GenericRepository<Comment>, ICommentRepository
    {
        public CommentRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }
    }
}
