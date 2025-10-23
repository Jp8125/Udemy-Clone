using Udemy.Interfaces;
using Udemy.Models;

namespace Udemy.Repositories
{
    public class OtpRepo : GenericRepo<Otp>, IOtp
    {
        public OtpRepo(UdemyContext context) : base(context)
        {
        }
    }
}
