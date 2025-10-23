using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Udemy.Interfaces;
using Udemy.Models;

namespace Udemy.Repositories
{
    public class GenericRepo<T> : IGenric<T> where T : class
    {
        private readonly UdemyContext _context;
        private readonly DbSet<T> _dbset;

        public GenericRepo(UdemyContext context)
        {
            _context = context;
            _dbset = context.Set<T>();
        }
        public async Task Delete(T item)
        {
            _dbset.Remove(item);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await _dbset.ToListAsync();
        }

        public async Task<T> GetById(int id)
        {
            return await _dbset.FindAsync(id);
        }

        public async Task Insert(T item)
        {
            await _dbset.AddAsync(item);
            await _context.SaveChangesAsync();
        }

        public async Task Update(T item)
        {
                   _dbset.Update(item);
            await _context.SaveChangesAsync();
        }
    }
}
