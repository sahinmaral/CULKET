namespace CULKET.Backend.Core.DTOs
{
    public class LoginResponseDto : NoContentDto
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public UserDetailDto User { get; set; }
    }
}
