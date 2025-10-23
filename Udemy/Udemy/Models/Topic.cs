using System;
using System.Collections.Generic;

namespace Udemy.Models;

public partial class Topic
{
    public int TopicId { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int? CourseId { get; set; }

    public int? CreatedBy { get; set; }

    public int? ModifiedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public virtual Course? Course { get; set; }

    public virtual User? CreatedByNavigation { get; set; }

    public virtual User? ModifiedByNavigation { get; set; }

    public virtual ICollection<Progress> Progresses { get; set; } = new List<Progress>();

    public virtual ICollection<SubTopic> SubTopics { get; set; } = new List<SubTopic>();
}
