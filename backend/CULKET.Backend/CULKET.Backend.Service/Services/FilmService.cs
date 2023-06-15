using AutoMapper;

using CULKET.Backend.Core.DTOs;
using CULKET.Backend.Core.Models;
using CULKET.Backend.Core.Repositories;
using CULKET.Backend.Core.Services;
using CULKET.Backend.Core.UnitOfWorks;

using Microsoft.AspNetCore.Http;

namespace CULKET.Backend.Service.Services
{
    public class FilmService : Service<Film,FilmDto>, IFilmService
    {
        private readonly IFilmRepository _filmRepository;

        public FilmService(IGenericRepository<Film> repository, IUnitOfWork unitOfWork, IMapper mapper, IFilmRepository filmRepository) : base(repository, unitOfWork, mapper)
        {
            _filmRepository = filmRepository;
        }

        public async Task<CustomResponseDto<Dictionary<int, string>>> GetAllTitleOfFilms()
        {
            var films = await _filmRepository.GetAllTitleOfFilms();

            return CustomResponseDto<Dictionary<int, string>>.Success(StatusCodes.Status200OK, films);
        }

        public async Task<CustomResponseDto<Dictionary<int, string>>> GetAllTitleOfFilmsExceptUserWatchedAndWantWatchFilmsByTokenAndWatchedAndWantWatchFilms(string token, List<UserWatchedFilmDto> watchedFilms, List<UserWantWatchFilmDto> wantWatchFilms)
        {
            var films = await _filmRepository.GetAllTitleOfFilmsExceptUserWatchedAndWantWatchFilms(watchedFilms,wantWatchFilms);

            return CustomResponseDto<Dictionary<int, string>>.Success(StatusCodes.Status200OK, films);
        }

        public async Task<CustomResponseDto<FilmWithGenresDto>> GetByIdDetail(int id)
        {
            var film = await _filmRepository.GetByIdDetail(id);
            var filmDto = _mapper.Map<FilmWithGenresDto>(film);
            return CustomResponseDto<FilmWithGenresDto>.Success(StatusCodes.Status200OK, filmDto);
        }

        public async Task<CustomResponseDto<List<FilmWithGenresDto>>> GetFilmsByDetail()
        {
            var films = await _filmRepository.GetFilmsByDetail();
            var filmDtos = _mapper.Map<List<FilmWithGenresDto>>(films);
            return CustomResponseDto<List<FilmWithGenresDto>>.Success(StatusCodes.Status200OK, filmDtos);
        }

        public CustomResponseDto<FilmWithGenresDto[]> GetRandomFiveFilmsByDetailExceptUserWatchedAndWantWatchFilms(List<UserWatchedFilmDto> watchedFilms, List<UserWantWatchFilmDto> wantWatchFilms)
        {
            var films = _filmRepository.GetRandomFiveFilmsByDetailExceptUserWatchedAndWantWatchFilms(watchedFilms,wantWatchFilms);
            var filmDtos = _mapper.Map<FilmWithGenresDto[]>(films);
            return CustomResponseDto<FilmWithGenresDto[]>.Success(StatusCodes.Status200OK, filmDtos);
        }
    }
}
