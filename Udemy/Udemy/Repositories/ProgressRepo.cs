using Udemy.Interfaces;
using Udemy.Models;

namespace Udemy.Repositories
{
    public class ProgressRepo : GenericRepo<Progress>, IProgress
    {
        public ProgressRepo(UdemyContext context) : base(context)
        {
        }
    }
}
