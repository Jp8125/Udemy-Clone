using System;
using System.Collections.Generic;

namespace Udemy.Models;

public partial class Object
{
    public int ObjectId { get; set; }

    public string Name { get; set; } = null!;

    public int? TypeId { get; set; }

    public int? CreatedBy { get; set; }

    public int? ModifiedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();

    public virtual User? CreatedByNavigation { get; set; }

    public virtual User? ModifiedByNavigation { get; set; }

    public virtual Type? Type { get; set; }
}
