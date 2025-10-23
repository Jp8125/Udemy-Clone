using Udemy.Interfaces;
using Udemy.Models;

namespace Udemy.Repositories
{
    public class TopicRepo : GenericRepo<Topic>, ITopic
    {
        public TopicRepo(UdemyContext context) : base(context)
        {
        }
    }
}
