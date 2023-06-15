using CULKET.Backend.Core.Models;

namespace CULKET.Backend.Core.DTOs
{
    public class UserDetailDto : BaseDto
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public Gender Gender { get; set; }
        public string Username { get; set; }
        public DateTime BirthDate { get; set; }
        public bool IsUserAddedWatchedFilmsAfterRegister { get; set; } = false;
        public List<UserWatchedFilm> UserWatchedFilms { get; set; } = new List<UserWatchedFilm>();
        public List<UserWantWatchFilm> UserWantWatchFilms { get; set; } = new List<UserWantWatchFilm>();
    }
}
