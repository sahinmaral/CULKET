﻿namespace CULKET.Backend.Core.DTOs
{
    public class UserWatchedFilmDto 
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsAgeRestricted { get; set; }
        public string Description { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Language { get; set; }
        public string BackdropImageURL { get; set; }
        public string PosterImageURL { get; set; }
        public DateTime UserAddedDate { get; set; }
    }
}
