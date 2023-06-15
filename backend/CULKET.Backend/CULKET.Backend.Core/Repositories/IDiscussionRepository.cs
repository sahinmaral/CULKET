using CULKET.Backend.Core.Models;


namespace CULKET.Backend.Core.Repositories
{
    public interface IDiscussionRepository : IGenericRepository<Discussion>
    {
        List<Discussion> GetAllByCreatedUserId(string id);
        List<Discussion> GetAllByDetail();
    }
}
