namespace CULKET.Backend.Core.Models
{
    public class Film : BaseEntity
    {
        public string Title { get; set; }
        public bool IsAgeRestricted { get; set; }
        public string Description { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Language { get; set; }
        public string BackdropImageURL { get; set; }
        public string PosterImageURL { get; set; }

        public List<FilmGenre> Genres { get; set; } = new List<FilmGenre>();
        public List<UserWatchedFilm> UserWatchedFilms { get; set; } = new List<UserWatchedFilm>();
        public List<UserWantWatchFilm> UserWantWatchFilms { get; set; } = new List<UserWantWatchFilm>();
    }
}
