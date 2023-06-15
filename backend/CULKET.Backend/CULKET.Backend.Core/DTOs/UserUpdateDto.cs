using CULKET.Backend.Core.Models;

namespace CULKET.Backend.Core.DTOs
{
    public class UserUpdateDto
    {
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public Gender Gender { get; set; }
    }
}
