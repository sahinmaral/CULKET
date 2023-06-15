namespace CULKET.Backend.Core.Models
{
    public class Genre : BaseEntity
    {
        public string Name { get; set; }

        public List<FilmGenre> Genres { get; set; } = new List<FilmGenre>();
    }
}
