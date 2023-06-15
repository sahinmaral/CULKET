using CULKET.Backend.Core.DTOs;
using CULKET.Backend.Core.Services;

using Microsoft.AspNetCore.Mvc;

namespace CULKET.Backend.WebAPI.Controllers
{
    public class UsersController : CustomBaseController
    {
        private readonly IUserService _userService;
        private readonly IFilmService _filmService;

        public UsersController(IUserService userService, IFilmService filmService)
        {
            _userService = userService;
            _filmService = filmService;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Login(UserLoginDto dto)
        {
            return CreateActionResult(await _userService.LoginAsync(dto));
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Register(UserRegisterDto dto)
        {
            return CreateActionResult(await _userService.RegisterAsync(dto));
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Logout()
        {
            return CreateActionResult(await _userService.LogoutAsync());
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> ConfirmAccount(string email,string token)
        {
            return CreateActionResult(await _userService.ConfirmAccount(email,token.Replace(" ","+")));
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> SendEmailConfirmationLink(string email)
        {
            return CreateActionResult(await _userService.SendEmailConfirmationLink(email));
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetWatchedFilmsOfUserFromAccessToken(string token)
        {
            return CreateActionResult(await _userService.GetWatchedFilmsOfUserFromAccessToken(token));
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetWantWatchFilmsOfUserFromAccessToken(string token)
        {
            return CreateActionResult(await _userService.GetWantWatchFilmsOfUserFromAccessToken(token));
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetUserFromAccessToken(string token)
        {
            return CreateActionResult(await _userService.GetUserFromAccessToken(token));
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> FillDetailedInformationsAfterRegister(UserUpdateDto user)
        {
            return CreateActionResult(await _userService.FillDetailedInformationsAfterRegister(user));
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddWatchedFilmsAfterRegister(AddWatchedFilmsResponseDto dto)
        {
            var filterResult = await _filmService.Where(x => dto.FilmIds.Contains(x.Id));
            if (filterResult.StatusCode == StatusCodes.Status200OK)
            {
                return CreateActionResult(await _userService.AddWatchedFilmsAfterRegister(dto,filterResult.Data.ToList()));
            }

            return CreateActionResult(filterResult);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddWantWatchFilmsOfUser(AddWantWatchFilmsResponseDto dto)
        {
            var filterResult = await _filmService.Where(x => dto.FilmIds.Contains(x.Id));
            if (filterResult.StatusCode == StatusCodes.Status200OK)
            {
                return CreateActionResult(await _userService.AddWantWatchFilmsOfUser(dto, filterResult.Data.ToList()));
            }

            return CreateActionResult(filterResult);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> UpdateWantWatchFilmOfUser(int updatedWantWatchFilmId,string token)
        {
            var filterResult = await _filmService.GetByIdAsync(updatedWantWatchFilmId);
            if (filterResult.StatusCode == StatusCodes.Status200OK)
            {
                return CreateActionResult(await _userService.UpdateWantWatchFilmOfUser(new UpdateWantWatchFilmOfUserDto()
                {
                    UpdatedWantWatchFilmId = updatedWantWatchFilmId,
                    AccessToken = token
                },filterResult.Data));
            }

            return CreateActionResult(filterResult);
        }
    }
}
