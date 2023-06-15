using CULKET.Backend.Core.DTOs;
using CULKET.Backend.Core.Identity;
using CULKET.Backend.Core.Services;

using Microsoft.AspNetCore.Http;

namespace CULKET.Backend.Service.Services
{
    public class UserService : IUserService
    {
        private readonly IUserAuthenticationService _userAuthenticationService;
        

        public UserService(IUserAuthenticationService userAuthenticationService)
        {
            _userAuthenticationService = userAuthenticationService;
        }

        public async Task<CustomResponseDto<LoginResponseDto>> LoginAsync(UserLoginDto dto)
        {
            return await _userAuthenticationService.LoginAsync(dto);
        }

        public async Task<CustomResponseDto<NoContentDto>> RegisterAsync(UserRegisterDto dto)
        {
            return await _userAuthenticationService.RegisterAsync(dto);
        }

        public async Task<CustomResponseDto<NoContentDto>> LogoutAsync()
        {
            return await _userAuthenticationService.LogoutAsync();
        }

        public async Task<CustomResponseDto<NoContentDto>> ConfirmAccount(string email, string token)
        {
            return await _userAuthenticationService.ConfirmAccount(email, token);
        }

        public async Task<CustomResponseDto<NoContentDto>> SendEmailConfirmationLink(string email)
        {
            return await _userAuthenticationService.SendEmailConfirmationLink(email);
        }

        public async Task<CustomResponseDto<UserDetailDto>> GetUserFromAccessToken(string email)
        {
            return await _userAuthenticationService.GetUserFromAccessToken(email);
        }

        public async Task<CustomResponseDto<NoContentDto>> FillDetailedInformationsAfterRegister(UserUpdateDto user)
        {
            return await _userAuthenticationService.FillDetailedInformationsAfterRegister(user);
        }

        public async Task<CustomResponseDto<NoContentDto>> AddWatchedFilmsAfterRegister(AddWatchedFilmsResponseDto dto, List<FilmDto> addedFilms)
        {
            var result = await _userAuthenticationService.GetUserFromAccessToken(dto.AccessToken);
            if (result.StatusCode != StatusCodes.Status200OK)
                return CustomResponseDto<NoContentDto>.Fail(result.StatusCode, result.Errors);


            return await _userAuthenticationService.AddWatchedFilmsAfterRegister(result.Data, addedFilms);

        }
        public async Task<CustomResponseDto<List<UserWantWatchFilmDto>>> GetWantWatchFilmsOfUserFromAccessToken(string token)
        {
            var result = await _userAuthenticationService.GetUserFromAccessToken(token);
            if (result.StatusCode != StatusCodes.Status200OK)
                return CustomResponseDto<List<UserWantWatchFilmDto>>.Fail(result.StatusCode, result.Errors);

            return await _userAuthenticationService.GetWantWatchFilmsOfUserByUsername(result.Data.Username);
        }
        public async Task<CustomResponseDto<List<UserWatchedFilmDto>>> GetWatchedFilmsOfUserFromAccessToken(string token)
        {
            var result = await _userAuthenticationService.GetUserFromAccessToken(token);
            if (result.StatusCode != StatusCodes.Status200OK)
                return CustomResponseDto<List<UserWatchedFilmDto>>.Fail(result.StatusCode, result.Errors);

            return await _userAuthenticationService.GetWatchedFilmsOfUserByUsername(result.Data.Username);
        }
        public async Task<CustomResponseDto<NoContentDto>> AddWantWatchFilmsOfUser(AddWantWatchFilmsResponseDto dto, List<FilmDto> addedFilms)
        {
            var result = await _userAuthenticationService.GetUserFromAccessToken(dto.AccessToken);
            if (result.StatusCode != StatusCodes.Status200OK)
                return CustomResponseDto<NoContentDto>.Fail(result.StatusCode, result.Errors);


            return await _userAuthenticationService.AddWantWatchFilmsOfUser(result.Data, addedFilms);
        }
        public async Task<CustomResponseDto<NoContentDto>> UpdateWantWatchFilmOfUser(UpdateWantWatchFilmOfUserDto dto,FilmDto updatedFilm)
        {
            var result = await _userAuthenticationService.GetUserFromAccessToken(dto.AccessToken);
            if (result.StatusCode != StatusCodes.Status200OK)
                return CustomResponseDto<NoContentDto>.Fail(result.StatusCode, result.Errors);


            return await _userAuthenticationService.UpdateWantWatchFilmOfUser(result.Data, updatedFilm);
        }
    }
}
