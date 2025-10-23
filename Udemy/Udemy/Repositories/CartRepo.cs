using Udemy.Interfaces;
using Udemy.Models;

namespace Udemy.Repositories
{
    public class CartRepo : GenericRepo<Cart>, ICart
    {
        private readonly UdemyContext _context;
        public CartRepo(UdemyContext context) : base(context)
        {
            _context = context;
        }
        public async Task removeMultiple(IList<Cart> data)
        {
             _context.RemoveRange(data);
            await _context.SaveChangesAsync();
        }
    }
}
