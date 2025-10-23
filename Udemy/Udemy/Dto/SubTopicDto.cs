namespace Udemy.Dto
{
    public class SubTopicDto
    {
        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public int Topics { get; set; }

        public int? ParentId { get; set; }
        public int CourseId { get; set; }
    }
}
