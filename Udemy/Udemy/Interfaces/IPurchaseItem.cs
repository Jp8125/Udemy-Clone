using Udemy.Models;

namespace Udemy.Interfaces
{
    public interface IPurchaseItem:IGenric<PurchaseItem>
    {
        public Task addMultiple(IList<PurchaseItem> values);
    }
}
