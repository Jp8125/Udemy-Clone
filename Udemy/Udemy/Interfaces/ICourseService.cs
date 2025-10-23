namespace Udemy.Interfaces
{
    public interface ICourseService
    {
        public Task<object> GetCourse(int courseId);
    }
}
