using Microsoft.AspNetCore.Identity;

namespace CULKET.Backend.Core.Models
{
    public class User : IdentityUser
    {
        public List<UserWatchedFilm> UserWatchedFilms { get; set; } = new List<UserWatchedFilm>();
        public List<UserWantWatchFilm> UserWantWatchFilms { get; set; } = new List<UserWantWatchFilm>();
        public Gender Gender { get; set; } = Gender.NOT_SPECIFIC;
        public DateTime? BirthDate { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public bool IsUserAddedWatchedFilmsAfterRegister { get; set; } = false;
    }
}
