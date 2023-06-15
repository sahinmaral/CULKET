using CULKET.Backend.Core.DTOs;
using CULKET.Backend.Core.Models;
using CULKET.Backend.Core.Services;
using CULKET.Backend.WebAPI.Filters;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace CULKET.Backend.WebAPI.Controllers
{

    [Authorize(AuthenticationSchemes = "Bearer",Roles = "User")]
    public class FilmsController : CustomBaseController
    {

        private readonly IFilmService _filmService;
        private readonly IUserService _userService;
        public FilmsController(IFilmService filmService, IUserService userService)
        {
            _filmService = filmService;
            _userService = userService;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllTitleOfFilms()
        {
            return CreateActionResult(await _filmService.GetAllTitleOfFilms());
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllTitleOfFilmsExceptUserWatchedAndWantWatchFilms()
        {
            var token = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");

            var watchedFilmResponse = await _userService.GetWatchedFilmsOfUserFromAccessToken(token);
            if (watchedFilmResponse.StatusCode != StatusCodes.Status200OK)
            {
                return CreateActionResult(watchedFilmResponse);
            }

            var wantWatchFilmResponse = await _userService.GetWantWatchFilmsOfUserFromAccessToken(token);
            if (wantWatchFilmResponse.StatusCode != StatusCodes.Status200OK)
            {
                return CreateActionResult(wantWatchFilmResponse);
            }

            return CreateActionResult(await _filmService.GetAllTitleOfFilmsExceptUserWatchedAndWantWatchFilmsByTokenAndWatchedAndWantWatchFilms(token,watchedFilmResponse.Data,wantWatchFilmResponse.Data));
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return CreateActionResult(await _filmService.GetAllAsync());
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllByDetail()
        {
            return CreateActionResult(await _filmService.GetFilmsByDetail());
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetRandomFiveFilmsByDetailExceptUserWatchedAndWantWatchFilms()
        {
            var token = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");

            var watchedFilmResponse = await _userService.GetWatchedFilmsOfUserFromAccessToken(token);
            if (watchedFilmResponse.StatusCode != StatusCodes.Status200OK)
            {
                return CreateActionResult(watchedFilmResponse);
            }

            var wantWatchFilmResponse = await _userService.GetWantWatchFilmsOfUserFromAccessToken(token);
            if (wantWatchFilmResponse.StatusCode != StatusCodes.Status200OK)
            {
                return CreateActionResult(wantWatchFilmResponse);
            }

            return CreateActionResult(_filmService.GetRandomFiveFilmsByDetailExceptUserWatchedAndWantWatchFilms(watchedFilmResponse.Data,wantWatchFilmResponse.Data));
        }

        [HttpGet("{id}")]
        [ServiceFilter(typeof(NotFoundFilter<Film,FilmDto>))]
        public async Task<IActionResult> GetById(int id)
        {
            return CreateActionResult(await _filmService.GetByIdAsync(id));
        }

        [HttpGet("[action]")]
        [ServiceFilter(typeof(NotFoundFilter<Film, FilmDto>))]
        public async Task<IActionResult> GetByIdDetail(int id)
        {
            return CreateActionResult(await _filmService.GetByIdDetail(id));
        }
    }
}
