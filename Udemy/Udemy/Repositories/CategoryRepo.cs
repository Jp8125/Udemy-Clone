using Udemy.Interfaces;
using Udemy.Models;

namespace Udemy.Repositories
{
    public class CategoryRepo : GenericRepo<Category>, ICategory
    {
        public CategoryRepo(UdemyContext context) : base(context)
        {

        }
    }
}
