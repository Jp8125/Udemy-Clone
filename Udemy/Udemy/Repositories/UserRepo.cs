using Udemy.Interfaces;
using Udemy.Models;

namespace Udemy.Repositories
{
    public class UserRepo : GenericRepo<User>, IUser
    {
        public UserRepo(UdemyContext context) : base(context)
        {

        }
    }
}
