using Udemy.Interfaces;
using Udemy.Models;

namespace Udemy.Repositories
{
    public class SubTopicRepo : GenericRepo<SubTopic>, ISubTopic
    {
        public SubTopicRepo(UdemyContext context) : base(context)
        {

        }
    }
}
