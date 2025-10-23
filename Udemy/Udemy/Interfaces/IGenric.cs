using Microsoft.AspNetCore.Mvc;

namespace Udemy.Interfaces
{
    public interface IGenric<T>
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(int id);
        Task Insert(T item);
        Task Update(T item);
        Task Delete(T item);
    }
}
