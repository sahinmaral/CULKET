namespace CULKET.Backend.Core.Models
{
    public class Discussion : BaseEntity
    {
        public string CreatedUserId { get; set; }
        public User CreatedUser { get; set; }
        public int Votes { get; set; } = 0;
        public Film Film { get; set; }
        public int FilmId { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }

        public List<Comment> Comments { get; set; }
    }
}
