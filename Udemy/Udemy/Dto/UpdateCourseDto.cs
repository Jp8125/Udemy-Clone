namespace Udemy.Dto
{
    public class UpdateCourseDto
    {
        public string Name { get; set; } = null!;

        public int CategoryId { get; set; }

        public decimal Price { get; set; }

        public string Description { get; set; } = null!;

        public double Duration { get; set; }

    }
}
