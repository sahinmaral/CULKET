namespace CULKET.Backend.Core.Models
{
    public class Comment : BaseEntity
    {
        public string CreatedUserId { get; set; }
        public User CreatedUser { get; set; }
        public Discussion Discussion { get; set; }
        public int DiscussionId { get; set; }
        public string Content { get; set; }
    }
}
