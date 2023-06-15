namespace CULKET.Backend.Core.DTOs
{
    public class CommentDto : BaseDto
    {
        public UserDetailDto CreatedUser { get; set; }
        public string CreatedUserId { get; set; }
        public int DiscussionId { get; set; }
        public string Content { get; set; }
    }
}
