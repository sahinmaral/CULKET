namespace CULKET.Backend.Core.DTOs
{
    public class DiscussionDto : BaseDto
    {
        public UserDetailDto CreatedUser { get; set; }
        public string CreatedUserId { get; set; }
        public string FilmId { get; set; }
        public int Votes { get; set; } = 0;
        public FilmDto Film { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }

        public List<CommentDto> Comments { get; set; }
    }
}
