using CULKET.Backend.Core.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CULKET.Backend.Core.DTOs
{
    public class FilmWithGenresDto : FilmDto
    {
        public List<GenreDto> Genres { get; set; }
    }
}
