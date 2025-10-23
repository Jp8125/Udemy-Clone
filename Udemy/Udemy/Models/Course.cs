using System;
using System.Collections.Generic;

namespace Udemy.Models;

public partial class Course
{
    public int CourseId { get; set; }

    public string? Name { get; set; }

    public int CategoryId { get; set; }

    public decimal Price { get; set; }

    public string Description { get; set; } = null!;

    public double Duration { get; set; }

    public string? ThumbnailSrc { get; set; }

    public int Coursestatus { get; set; }

    public int? CreatedBy { get; set; }

    public int? ModifiedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual Category Category { get; set; } = null!;

    public virtual Object CoursestatusNavigation { get; set; } = null!;

    public virtual User? CreatedByNavigation { get; set; }

    public virtual User? ModifiedByNavigation { get; set; }

    public virtual ICollection<Progress> Progresses { get; set; } = new List<Progress>();

    public virtual ICollection<PurchaseItem> PurchaseItems { get; set; } = new List<PurchaseItem>();

    public virtual ICollection<Topic> Topics { get; set; } = new List<Topic>();
}
