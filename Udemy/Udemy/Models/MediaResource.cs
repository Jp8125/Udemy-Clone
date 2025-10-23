using System;
using System.Collections.Generic;

namespace Udemy.Models;

public partial class MediaResource
{
    public int MediaId { get; set; }

    public string MediaType { get; set; } = null!;

    public string MediaSrc { get; set; } = null!;

    public int? TopicId { get; set; }

    public int? CreatedBy { get; set; }

    public int? ModifiedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public virtual User? CreatedByNavigation { get; set; }

    public virtual User? ModifiedByNavigation { get; set; }

    public virtual SubTopic? Topic { get; set; }
}
