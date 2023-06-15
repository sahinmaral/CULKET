using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CULKET.Backend.Core.DTOs
{
    public class AddCommentDto
    {
        public int DiscussionId { get; set; }
        public string Content { get; set; }
        public string AccessToken { get; set; }
    }
}
