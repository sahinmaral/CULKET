using CULKET.Backend.Core.DTOs;
using CULKET.Backend.Core.Services;

using Microsoft.AspNetCore.Mvc;

namespace CULKET.Backend.WebAPI.Controllers
{
    public class DiscussionsController : CustomBaseController
    {
        private readonly IDiscussionService _discussionService;
        private readonly IUserService _userService;
        private readonly IFilmService _filmService;

        public DiscussionsController(IDiscussionService discussionService, IUserService userService, IFilmService filmService)
        {
            _discussionService = discussionService;
            _userService = userService;
            _filmService = filmService;
        }

        [HttpPost]
        public async Task<IActionResult> AddAsync(AddDiscussionDto dto)
        {
            var userResult = await _userService.GetUserFromAccessToken(dto.AccessToken);
            if (userResult.StatusCode != StatusCodes.Status200OK)
            {
                return CreateActionResult(userResult);
            }

            var filmResult = await _filmService.GetByIdAsync(dto.FilmId);
            if (filmResult.StatusCode != StatusCodes.Status200OK)
            {
                return CreateActionResult(filmResult);
            }

            return CreateActionResult(await _discussionService.AddAsync(new DiscussionDto
            {
                Header = dto.Header,
                Description= dto.Description,
                FilmId = filmResult.Data.Id,
                CreatedUserId = userResult.Data.Id
            }));
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllByCreatedUser(string token)
        {
            var userResult = await _userService.GetUserFromAccessToken(token);
            if (userResult.StatusCode != StatusCodes.Status200OK)
            {
                return CreateActionResult(userResult);
            }

            return CreateActionResult(_discussionService.GetAllByCreatedUserId(userResult.Data.Id));
        }

        [HttpGet("[action]")]
        public IActionResult GetAllByDetail()
        {
            return CreateActionResult(_discussionService.GetAllByDetail());
        }
    }
}
