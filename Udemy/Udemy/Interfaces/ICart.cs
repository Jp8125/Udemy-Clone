using Udemy.Models;

namespace Udemy.Interfaces
{
    public interface ICart:IGenric<Cart>
    {
        public Task removeMultiple(IList<Cart> data);
    }
}
