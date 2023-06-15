using CULKET.Backend.Core.DTOs;
using CULKET.Backend.Core.Services;
using CULKET.Backend.Service.Services;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Newtonsoft.Json.Linq;

namespace CULKET.Backend.WebAPI.Controllers
{
    public class CommentsController : CustomBaseController
    {
        private readonly ICommentService _commentService;
        private readonly IUserService _userService;
        public CommentsController(ICommentService commentService, IUserService userService )
        {
            _commentService = commentService;
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> AddCommentToDiscussion(AddCommentDto dto)
        {
            var userResult = await _userService.GetUserFromAccessToken(dto.AccessToken);
            if (userResult.StatusCode != StatusCodes.Status200OK)
            {
                return CreateActionResult(userResult);
            }

            return CreateActionResult(await _commentService.AddAsync(new CommentDto()
            {
                DiscussionId = dto.DiscussionId,
                Content = dto.Content,
                CreatedUserId = userResult.Data.Id
            }));
        }
    }
}
