using Udemy.Interfaces;
using Udemy.Models;

namespace Udemy.Repositories
{
    public class PaymentRepo : GenericRepo<Payment>, IPayment
    {
        public PaymentRepo(UdemyContext context) : base(context)
        {
        }
    }
}
