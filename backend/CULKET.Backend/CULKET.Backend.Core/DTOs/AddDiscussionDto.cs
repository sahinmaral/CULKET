namespace CULKET.Backend.Core.DTOs
{
    public class AddDiscussionDto
    {
        public int FilmId { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }
        public string AccessToken { get; set; }
    }
}
