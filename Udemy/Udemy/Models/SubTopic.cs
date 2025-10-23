using System;
using System.Collections.Generic;

namespace Udemy.Models;

public partial class SubTopic
{
    public int SubTopicId { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int Topics { get; set; }

    public int? ParentId { get; set; }

    public int? CreatedBy { get; set; }

    public int? ModifiedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public virtual User? CreatedByNavigation { get; set; }

    public virtual ICollection<SubTopic> InverseParent { get; set; } = new List<SubTopic>();

    public virtual ICollection<MediaResource> MediaResources { get; set; } = new List<MediaResource>();

    public virtual User? ModifiedByNavigation { get; set; }

    public virtual SubTopic? Parent { get; set; }

    public virtual Topic TopicsNavigation { get; set; } = null!;
}
