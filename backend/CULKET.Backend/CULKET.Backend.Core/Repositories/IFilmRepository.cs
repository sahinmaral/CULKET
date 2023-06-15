using CULKET.Backend.Core.DTOs;
using CULKET.Backend.Core.Models;

namespace CULKET.Backend.Core.Repositories
{
    public interface IFilmRepository : IGenericRepository<Film>
    {
        Task<Dictionary<int,string>> GetAllTitleOfFilms();
        Task<Dictionary<int, string>> GetAllTitleOfFilmsExceptUserWatchedAndWantWatchFilms(List<UserWatchedFilmDto> watchedFilms, List<UserWantWatchFilmDto> wantWatchFilms);
        Task<Film> GetByIdDetail(int id);
        Task<List<Film>> GetFilmsByDetail();
        Film[] GetRandomFiveFilmsByDetailExceptUserWatchedAndWantWatchFilms(List<UserWatchedFilmDto> watchedFilms, List<UserWantWatchFilmDto> wantWatchFilms);
    }
}
