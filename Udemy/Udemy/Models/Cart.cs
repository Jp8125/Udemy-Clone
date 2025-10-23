using System;
using System.Collections.Generic;

namespace Udemy.Models;

public partial class Cart
{
    public int CartId { get; set; }

    public int? UserId { get; set; }

    public int? CourseId { get; set; }

    public virtual Course? Course { get; set; }

    public virtual User? User { get; set; }
}
