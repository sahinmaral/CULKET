using CULKET.Backend.Core.Models;
using CULKET.Backend.Core.Repositories;

using Microsoft.EntityFrameworkCore;

namespace CULKET.Backend.Repository.Repositories
{
    public class DiscussionRepository : GenericRepository<Discussion>, IDiscussionRepository
    {
        public DiscussionRepository(AppDbContext appDbContext) : base(appDbContext)
        {

        }

        public List<Discussion> GetAllByDetail()
        {
            return _appDbContext.Discussions
                .Include(x => x.Film)
                .Include(x => x.Comments)
                    .ThenInclude(x => x.CreatedUser)
                .Include(x => x.CreatedUser)
                .ToList();
        }

        public List<Discussion> GetAllByCreatedUserId(string id)
        {
            return _appDbContext.Discussions
                .Include(x => x.Film)
                .Where(x => x.CreatedUserId== id)
                .ToList();
        }
    }
}
