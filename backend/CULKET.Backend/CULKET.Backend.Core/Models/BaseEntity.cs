﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CULKET.Backend.Core.Models
{
    // Entity lerimizin base yapisi oldugu icin instance olusturmak istemiyoruz
    // bu yuzden abstract olarak olusturduk.
    public abstract class BaseEntity
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
