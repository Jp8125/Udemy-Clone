using Udemy.Interfaces;
using Udemy.Models;

namespace Udemy.Repositories
{
    public class CourseRepo : GenericRepo<Course>,ICourse
    {
        public CourseRepo(UdemyContext context) : base(context)
        {
        }
    }
}
