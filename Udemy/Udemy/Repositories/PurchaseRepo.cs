using Udemy.Interfaces;
using Udemy.Models;

namespace Udemy.Repositories
{
    public class PurchaseRepo : GenericRepo<Purchase>, IPurchase
    {
        public PurchaseRepo(UdemyContext context) : base(context)
        {
        }
    }
}
