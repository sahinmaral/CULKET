using AutoMapper;

using CULKET.Backend.Core.DTOs;
using CULKET.Backend.Core.Models;

namespace CULKET.Backend.Service.Mapping
{
    public class MapProfile : Profile
    {
        public MapProfile()
        {
            CreateMap<Film, FilmDto>().ReverseMap();

            CreateMap<Genre, GenreDto>().ReverseMap();

            CreateMap<Film, FilmWithGenresDto>()
                  .ForMember(dto => dto.Genres,
                    opt => opt.MapFrom(x => x.Genres.Select(y => y.Genre).ToList()));

            CreateMap<User, UserDetailDto>()
                .ForMember(x => x.Username, opt => opt.MapFrom(x => x.UserName));

            CreateMap<UserDetailDto, User>()
                .ForMember(x => x.UserName, opt => opt.MapFrom(x => x.Username));

            CreateMap<Film, UserWantWatchFilmDto>();
            CreateMap<Film, UserWatchedFilmDto>();

            CreateMap<Discussion, DiscussionDto>().ReverseMap();
            CreateMap<Comment, CommentDto>().ReverseMap();
        }
    }
}
