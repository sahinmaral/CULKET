using CULKET.Backend.Core.DTOs;

namespace CULKET.Backend.Core.Services
{
    public interface IUserService
    {
        Task<CustomResponseDto<LoginResponseDto>> LoginAsync(UserLoginDto dto);
        Task<CustomResponseDto<NoContentDto>> RegisterAsync(UserRegisterDto dto);
        Task<CustomResponseDto<NoContentDto>> LogoutAsync();
        Task<CustomResponseDto<NoContentDto>> ConfirmAccount(string email, string token);
        Task<CustomResponseDto<NoContentDto>> SendEmailConfirmationLink(string email);
        Task<CustomResponseDto<UserDetailDto>> GetUserFromAccessToken(string token);
        Task<CustomResponseDto<NoContentDto>> FillDetailedInformationsAfterRegister(UserUpdateDto user);
        Task<CustomResponseDto<NoContentDto>> AddWatchedFilmsAfterRegister(AddWatchedFilmsResponseDto dto, List<FilmDto> addedFilms);
        Task<CustomResponseDto<List<UserWantWatchFilmDto>>> GetWantWatchFilmsOfUserFromAccessToken(string token);
        Task<CustomResponseDto<List<UserWatchedFilmDto>>> GetWatchedFilmsOfUserFromAccessToken(string token);
        Task<CustomResponseDto<NoContentDto>> AddWantWatchFilmsOfUser(AddWantWatchFilmsResponseDto dto, List<FilmDto> addedFilms);
        Task<CustomResponseDto<NoContentDto>> UpdateWantWatchFilmOfUser(UpdateWantWatchFilmOfUserDto dto, FilmDto updatedFilm);
    }
}
