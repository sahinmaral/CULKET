namespace CULKET.Backend.Core.Models
{
    public class UserWantWatchFilm 
    {
        public UserWantWatchFilm()
        {
            CreatedDate = DateTime.Now;
        }

        public string UserId { get; set; }
        public int FilmId { get; set; }
        public Film Film { get; set; }
        public User User { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
