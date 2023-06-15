using CULKET.Backend.Core.DTOs;
using CULKET.Backend.Core.Models;

namespace CULKET.Backend.Core.Services
{
    public interface IFilmService : IService<Film,FilmDto>
    {
        Task<CustomResponseDto<Dictionary<int, string>>> GetAllTitleOfFilms();
        Task<CustomResponseDto<Dictionary<int, string>>> GetAllTitleOfFilmsExceptUserWatchedAndWantWatchFilmsByTokenAndWatchedAndWantWatchFilms(string token, List<UserWatchedFilmDto> watchedFilms, List<UserWantWatchFilmDto> wantWatchFilms);
        Task<CustomResponseDto<FilmWithGenresDto>> GetByIdDetail(int id);
        Task<CustomResponseDto<List<FilmWithGenresDto>>> GetFilmsByDetail();
        CustomResponseDto<FilmWithGenresDto[]> GetRandomFiveFilmsByDetailExceptUserWatchedAndWantWatchFilms(List<UserWatchedFilmDto> watchedFilms, List<UserWantWatchFilmDto> wantWatchFilms);
    }
}
