using System;
using System.Collections.Generic;

namespace Udemy.Models;

public partial class Type
{
    public int TypeId { get; set; }

    public string Name { get; set; } = null!;

    public int? ParentId { get; set; }

    public int? CreatedBy { get; set; }

    public int? ModifiedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public virtual User? CreatedByNavigation { get; set; }

    public virtual ICollection<Type> InverseParent { get; set; } = new List<Type>();

    public virtual User? ModifiedByNavigation { get; set; }

    public virtual ICollection<Object> Objects { get; set; } = new List<Object>();

    public virtual Type? Parent { get; set; }
}
