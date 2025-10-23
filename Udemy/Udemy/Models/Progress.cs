using System;
using System.Collections.Generic;

namespace Udemy.Models;

public partial class Progress
{
    public int ProgressId { get; set; }

    public int Uid { get; set; }

    public int CourseId { get; set; }

    public int Topics { get; set; }

    public int? CreatedBy { get; set; }

    public int? ModifiedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public double? Percentage { get; set; }

    public virtual Course Course { get; set; } = null!;

    public virtual User? CreatedByNavigation { get; set; }

    public virtual User? ModifiedByNavigation { get; set; }

    public virtual Topic TopicsNavigation { get; set; } = null!;

    public virtual User UidNavigation { get; set; } = null!;
}
