using Microsoft.EntityFrameworkCore;
using Udemy.Interfaces;
using Udemy.Models;

namespace Udemy.Repositories
{
    public class PurchaseItemRepo : GenericRepo<PurchaseItem>, IPurchaseItem
    {
        private readonly UdemyContext _context;
        public PurchaseItemRepo(UdemyContext context) : base(context)
        {
            _context = context;
        }
        public async Task addMultiple(IList<PurchaseItem> values)
        {
            await _context.AddRangeAsync(values);
            await _context.SaveChangesAsync();
        }
    }
}
