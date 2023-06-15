using CULKET.Backend.Core.DTOs;

namespace CULKET.Backend.Core.Identity
{
    public interface IUserAuthenticationService
    {
        Task<CustomResponseDto<LoginResponseDto>> LoginAsync(UserLoginDto dto);
        Task<CustomResponseDto<NoContentDto>> RegisterAsync(UserRegisterDto dto);
        Task<CustomResponseDto<NoContentDto>> LogoutAsync();
        Task<CustomResponseDto<NoContentDto>> ConfirmAccount(string email, string token);
        Task<CustomResponseDto<NoContentDto>> SendEmailConfirmationLink(string email);
        Task<CustomResponseDto<UserDetailDto>> GetUserFromAccessToken(string token);
        Task<CustomResponseDto<NoContentDto>> FillDetailedInformationsAfterRegister(UserUpdateDto user);
        Task<CustomResponseDto<NoContentDto>> AddWatchedFilmsAfterRegister(UserDetailDto userDto,IEnumerable<FilmDto> filmDtos);
        Task<CustomResponseDto<List<UserWantWatchFilmDto>>> GetWantWatchFilmsOfUserByUsername(string username);
        Task<CustomResponseDto<List<UserWatchedFilmDto>>> GetWatchedFilmsOfUserByUsername(string username);
        Task<CustomResponseDto<NoContentDto>> AddWantWatchFilmsOfUser(UserDetailDto dto, List<FilmDto> addedFilms);
        Task<CustomResponseDto<NoContentDto>> UpdateWantWatchFilmOfUser(UserDetailDto dto, FilmDto updatedFilm);
    }
}
