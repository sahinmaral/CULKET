using AutoMapper;

using CULKET.Backend.Core.DTOs;
using CULKET.Backend.Core.Identity;
using CULKET.Backend.Core.Models;
using CULKET.Backend.Identity.Helpers;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using System.Data;
using System.Linq;
using System.Security.Claims;

namespace CULKET.Backend.Identity
{
    public class UserAuthenticationService : IUserAuthenticationService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public UserAuthenticationService(UserManager<User> userManager, SignInManager<User> signInManager, RoleManager<Role> roleManager, IMapper mapper, ITokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _mapper = mapper;
            _tokenService = tokenService;
        }
        public async Task<CustomResponseDto<NoContentDto>> ConfirmAccount(string email, string token)
        {
            User user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                string message = "Böyle bir kullanıcı bulunamadı.";
                return CustomResponseDto<NoContentDto>.Fail(StatusCodes.Status404NotFound, message);
            }

            if (user.EmailConfirmed)
            {
                string message = "Hesabınız zaten onaylıdır.";
                return CustomResponseDto<NoContentDto>.Fail(StatusCodes.Status400BadRequest, message);
            }

            IdentityResult result = await _userManager.ConfirmEmailAsync(user, token);

            if (result.Succeeded)
            {
                return CustomResponseDto<NoContentDto>.Success(StatusCodes.Status200OK);
            }
            else
            {
                string message = "Linkin süresi dolmuştur. Giriş sayfasından tekrar email onay linki isteyebilirsiniz.";
                return CustomResponseDto<NoContentDto>.Fail(StatusCodes.Status400BadRequest, message);
            }
        }
        public async Task<CustomResponseDto<NoContentDto>> FillDetailedInformationsAfterRegister(UserUpdateDto userDto)
        {
            User user = await _userManager.FindByEmailAsync(userDto.Email);
            if (user == null)
            {
                string message = "Böyle bir kullanıcı bulunamadı";
                return CustomResponseDto<NoContentDto>.Fail(StatusCodes.Status404NotFound, message);
            }

            user.BirthDate= userDto.BirthDate;
            user.Gender= userDto.Gender;
            user.Name= userDto.Name;
            user.Surname= userDto.Surname;

            var updateResult = await _userManager.UpdateAsync(user);
            if (updateResult.Succeeded)
            {
                return CustomResponseDto<NoContentDto>.Success(StatusCodes.Status200OK);
            }

            return CustomResponseDto<NoContentDto>.Fail(StatusCodes.Status400BadRequest,updateResult.Errors.Select(x=>x.Description).ToList());
        }
        public async Task<CustomResponseDto<UserDetailDto>> GetUserFromAccessToken(string token)
        {
            ClaimsPrincipal principal;

            try
            {
                principal = _tokenService.CheckIfTokenIsValidAndGetPrincipalFromToken(token);
            }
            catch (Exception ex)
            {
                return CustomResponseDto<UserDetailDto>.Fail(StatusCodes.Status400BadRequest,ex.Message);
            }

            User user = await _userManager.FindByNameAsync(principal.FindFirstValue(ClaimTypes.Name));
            return CustomResponseDto<UserDetailDto>.Success(200, _mapper.Map<UserDetailDto>(user));
            
        }
        public async Task<CustomResponseDto<List<UserWantWatchFilmDto>>> GetWantWatchFilmsOfUserByUsername(string username)
        {
            User? user = await _userManager.Users
                .Include(user => user.UserWantWatchFilms)
                .ThenInclude(userWantWatchFilm => userWantWatchFilm.Film)
                .FirstOrDefaultAsync(x => x.UserName == username);

            if (user == null)
            {
                string message = "Böyle bir kullanıcı bulunamadı";
                return CustomResponseDto<List<UserWantWatchFilmDto>>.Fail(StatusCodes.Status404NotFound, message);
            }

            var films = user.UserWantWatchFilms.Select(x =>
            {
                var filmDto = _mapper.Map<UserWantWatchFilmDto>(x.Film);
                filmDto.UserAddedDate = x.CreatedDate;
                return filmDto;
            }).ToList();

            return CustomResponseDto<List<UserWantWatchFilmDto>>.Success(StatusCodes.Status200OK, films);

        }
        public async Task<CustomResponseDto<List<UserWatchedFilmDto>>> GetWatchedFilmsOfUserByUsername(string username)
        {
            User? user = await _userManager.Users
                .Include(user => user.UserWatchedFilms)
                .ThenInclude(userWatchedFilm => userWatchedFilm.Film)         
                .FirstOrDefaultAsync(x => x.UserName == username);
            
            if (user == null)
            {
                string message = "Böyle bir kullanıcı bulunamadı";
                return CustomResponseDto<List<UserWatchedFilmDto>>.Fail(StatusCodes.Status404NotFound, message);
            }

            var films = user.UserWatchedFilms.Select(x =>
            {
                var filmDto = _mapper.Map<UserWatchedFilmDto>(x.Film);
                filmDto.UserAddedDate = x.CreatedDate;
                return filmDto;
            }).ToList();

            return CustomResponseDto<List<UserWatchedFilmDto>>.Success(StatusCodes.Status200OK, films);
        }
        public async Task<CustomResponseDto<LoginResponseDto>> LoginAsync(UserLoginDto dto)
        {
            User user = await _userManager.FindByNameAsync(dto.Username);
            if (user == null)
            {
                string message = "Böyle bir kullanıcı bulunamadı";
                return CustomResponseDto<LoginResponseDto>.Fail(StatusCodes.Status404NotFound, message);
            }

            user.SecurityStamp = await _userManager.GetSecurityStampAsync(user);

            if (await _userManager.IsLockedOutAsync(user))
            {
                string message = $"Hesabiniz {user.LockoutEnd} kadar kilitlenmiştir. Lütfen daha sonra tekrar deneyiniz";
                return CustomResponseDto<LoginResponseDto>.Fail(StatusCodes.Status403Forbidden, message);
            }

            if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                string message = $"Hesabiniz onaylanmamıştır. Lütfen email adresinize gönderilen link üzerinden onaylayınız.";
                return CustomResponseDto<LoginResponseDto>.Fail(StatusCodes.Status401Unauthorized, message);
            }

            await _signInManager.SignOutAsync();

            SignInResult result = await _signInManager.PasswordSignInAsync(user, dto.Password, dto.RememberMe, false);

            if (result.Succeeded)
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, dto.Username),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                await _userManager.ResetAccessFailedCountAsync(user);

                var accessToken = _tokenService.GenerateAccessToken(authClaims);
                var refreshToken = _tokenService.GenerateRefreshToken();

                LoginResponseDto tokenDto = new LoginResponseDto
                {
                    AccessToken = accessToken,
                    RefreshToken = refreshToken,
                    User = _mapper.Map<UserDetailDto>(user)
                };

                return CustomResponseDto<LoginResponseDto>.Success(StatusCodes.Status200OK, tokenDto);
            }

            else
            {

                await _userManager.AccessFailedAsync(user);

                int failedAttemps = await _userManager.GetAccessFailedCountAsync(user);

                //Convert.ToInt32(_config["Constants:AccessFailedCount"])
                if (failedAttemps == 5)
                {
                    await _userManager.SetLockoutEndDateAsync(user, new DateTimeOffset(DateTime.Now.AddMinutes(20)));
                    string message = $"Hesabiniz {failedAttemps} basarisiz giristen dolayi 20 dakika kadar kilitlenmistir. Lutfen daha sonra tekrar deneyiniz";
                    return CustomResponseDto<LoginResponseDto>.Fail(StatusCodes.Status403Forbidden, message);
                }

                else
                {
                    string message = "Gecersiz email veya sifre";
                    return CustomResponseDto<LoginResponseDto>.Fail(StatusCodes.Status400BadRequest, message);
                }
            }

        }
        public async Task<CustomResponseDto<NoContentDto>> LogoutAsync()
        {
            await _signInManager.SignOutAsync();

            return CustomResponseDto<NoContentDto>.Success(StatusCodes.Status200OK);
        }
        public async Task<CustomResponseDto<NoContentDto>> RegisterAsync(UserRegisterDto dto)
        {
            var userExists = await _userManager.FindByEmailAsync(dto.Email);
            if (userExists != null)
                return CustomResponseDto<NoContentDto>.Fail(StatusCodes.Status403Forbidden, "Bu email adresine kayıtlı zaten bir kullanıcı mevcut");

            User user = new User()
            {
                Email = dto.Email,
                UserName = dto.Username,
                SecurityStamp = Guid.NewGuid().ToString(),
            };

            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded)
                return CustomResponseDto<NoContentDto>.Fail(StatusCodes.Status400BadRequest, result.Errors.Select(x => x.Description).ToList());

            string confirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            string link = string.Format("http://localhost:3000/auth/userConfirm?email={0}&token={1}", dto.Email, confirmationToken);

            await EmailConfirmationHelper.EmailConfirmationSendEmail(link, dto.Email);

            Role role = await _roleManager.FindByNameAsync("User");
            await _userManager.AddToRoleAsync(user, role.Name);

            return CustomResponseDto<NoContentDto>.Success(201);
        }
        public async Task<CustomResponseDto<NoContentDto>> SendEmailConfirmationLink(string email)
        {

            var userExists = await _userManager.FindByEmailAsync(email);
            if (userExists == null)
                return CustomResponseDto<NoContentDto>.Success(StatusCodes.Status200OK);

            if (userExists.EmailConfirmed)
            {
                string message = "Hesabınız zaten onaylıdır.";
                return CustomResponseDto<NoContentDto>.Fail(StatusCodes.Status400BadRequest, message);
            }

            string confirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(userExists);

            string link = string.Format("http://localhost:3000/auth/userConfirm?email={0}&token={1}", userExists.Email, confirmationToken);

            await EmailConfirmationHelper.EmailConfirmationSendEmail(link, userExists.Email);

            return CustomResponseDto<NoContentDto>.Success(StatusCodes.Status200OK);
        }
        public async Task<CustomResponseDto<NoContentDto>> AddWatchedFilmsAfterRegister(UserDetailDto userDto, IEnumerable<FilmDto> filmDtos)
        {
            User user = await _userManager.FindByNameAsync(userDto.Username);
            user.UserWatchedFilms.AddRange(filmDtos.Select(x => new UserWatchedFilm
            {
                FilmId = Convert.ToInt32(x.Id)
            }));
            user.IsUserAddedWatchedFilmsAfterRegister = userDto.IsUserAddedWatchedFilmsAfterRegister;

            await _userManager.UpdateAsync(user);

            return CustomResponseDto<NoContentDto>.Success(StatusCodes.Status200OK);
        }
        public async Task<CustomResponseDto<NoContentDto>> AddWantWatchFilmsOfUser(UserDetailDto dto, List<FilmDto> addedFilms)
        {
            User user = await _userManager.Users
                .Include(user => user.UserWantWatchFilms)
                .ThenInclude(userWantWatchFilm => userWantWatchFilm.Film)
                .FirstAsync(x => x.UserName == dto.Username);

            var alreadyInListFilms = user.UserWantWatchFilms.Where(x => addedFilms.Select(x => x.Id).ToList().Contains(x.Film.Id.ToString())).ToList();
            if (alreadyInListFilms.Any())
            {
                List<string> errorMessages = alreadyInListFilms.Select(x => string.Format("{0} filmi zaten izlenecekler listesindedir.", x.Film.Title)).ToList();

                return CustomResponseDto<NoContentDto>.Fail(StatusCodes.Status400BadRequest,errorMessages);
            }


            user.UserWantWatchFilms.AddRange(addedFilms.Select(x => new UserWantWatchFilm
            {
                FilmId = Convert.ToInt32(x.Id)
            }));

            await _userManager.UpdateAsync(user);

            return CustomResponseDto<NoContentDto>.Success(StatusCodes.Status200OK);
        }
        public async Task<CustomResponseDto<NoContentDto>> UpdateWantWatchFilmOfUser(UserDetailDto dto, FilmDto updatedFilm)
        {
            User user = await _userManager.Users
                .Include(user => user.UserWatchedFilms)
                .ThenInclude(userWatchedFilm => userWatchedFilm.Film)
                .Include(user => user.UserWantWatchFilms)
                .ThenInclude(userWantWatchFilm => userWantWatchFilm.Film)
                .FirstAsync(x => x.UserName == dto.Username);


            int count = 0;
            foreach (var watchedFilms in user.UserWatchedFilms.OrderByDescending(x => x.CreatedDate).ToList())
            {
                if (count == 2) break;
                if (DateTime.Now.Subtract(watchedFilms.CreatedDate).TotalHours < 24) count++;
            }
            
            if(count == 2)
            {
                return CustomResponseDto<NoContentDto>.Fail(StatusCodes.Status400BadRequest,"Günlük film izleme limitiniz adil değerlendirme yapmanız açısından 2 olup limitiniz kalmamıştır. Lütfen 24 saat sonra tekrar deneyiniz.");
            }

            user.UserWantWatchFilms = user.UserWantWatchFilms.Where(x => x.Film.Id.ToString() != updatedFilm.Id).ToList();

            user.UserWatchedFilms.Add(new UserWatchedFilm()
            {
                FilmId = Convert.ToInt32(updatedFilm.Id)
            });

            await _userManager.UpdateAsync(user);

            return CustomResponseDto<NoContentDto>.Success(StatusCodes.Status200OK);
        }
    }
}
