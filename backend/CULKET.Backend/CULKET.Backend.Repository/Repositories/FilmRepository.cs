using CULKET.Backend.Core.DTOs;
using CULKET.Backend.Core.Models;
using CULKET.Backend.Core.Repositories;

using Microsoft.EntityFrameworkCore;

namespace CULKET.Backend.Repository.Repositories
{
    public class FilmRepository : GenericRepository<Film>, IFilmRepository
    {
        public FilmRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }

        public async Task<Dictionary<int, string>> GetAllTitleOfFilms()
        {
            return await _appDbContext.Films.ToDictionaryAsync(x => x.Id, x => x.Title);
        }

        public async Task<Dictionary<int, string>> GetAllTitleOfFilmsExceptUserWatchedAndWantWatchFilms(List<UserWatchedFilmDto> watchedFilms, List<UserWantWatchFilmDto> wantWatchFilms)
        {
            return await _appDbContext.Films
                .Where(x => !watchedFilms.Select(k => k.Id).ToList().Contains(x.Id) && !wantWatchFilms.Select(k => k.Id).ToList().Contains(x.Id))
                .ToDictionaryAsync(x => x.Id, x => x.Title);
        }

        public async Task<Film> GetByIdDetail(int id)
        {
            return await _appDbContext.Films
                .Include(film => film.Genres)
                    .ThenInclude(filmGenre => filmGenre.Genre)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Film>> GetFilmsByDetail()
        {
            return await _appDbContext.Films
                .Include(x => x.Genres)
                    .ThenInclude(k => k.Genre)
                .ToListAsync();
        }

        public Film[] GetRandomFiveFilmsByDetailExceptUserWatchedAndWantWatchFilms(List<UserWatchedFilmDto> watchedFilms, List<UserWantWatchFilmDto> wantWatchFilms)
        {
            var films = _appDbContext.Films.AsQueryable().Include(x => x.Genres)
                    .ThenInclude(k => k.Genre);

            int[] randomNumbers = new int[5];
            Film[] randomFilms = new Film[5];

            for (int i = 0; i < 5; i++)
            {
                Random rnd = new Random();
                int number = rnd.Next(films.Count());
                while (randomNumbers.Contains(number))
                {
                    number = rnd.Next(films.Count());
                }
                randomNumbers[i] = number;
                randomFilms[i] = films.OrderBy(x => x.Id).Skip(number).First();
            }

            return randomFilms;


        }
    }
}
