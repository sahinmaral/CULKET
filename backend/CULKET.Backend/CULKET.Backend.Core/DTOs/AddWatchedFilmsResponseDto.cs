namespace CULKET.Backend.Core.DTOs
{
    public class AddWatchedFilmsResponseDto
    {
        public List<int> FilmIds { get; set; }
        public string AccessToken { get; set; }
    }
}
