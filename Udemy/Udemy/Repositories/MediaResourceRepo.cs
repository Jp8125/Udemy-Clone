using Udemy.Interfaces;
using Udemy.Models;

namespace Udemy.Repositories
{
    public class MediaResourceRepo:GenericRepo<MediaResource>,IMediaResources
    {
        public MediaResourceRepo(UdemyContext context) : base(context)
        {
        }
    }
}
