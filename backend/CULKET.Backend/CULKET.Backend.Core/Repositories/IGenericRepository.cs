using CULKET.Backend.Core.Models;
using System.Linq.Expressions;


namespace CULKET.Backend.Core.Repositories
{
    public interface IGenericRepository<T> where T : BaseEntity, new()
    {
        // IQueryable ile verilerimiz uzerinde sorgulama islemleri yaptiktan sonra
        // ToList ve ToListAsync metodu ile veritabanindan verileri alir.
        IQueryable<T> GetAll();
        Task<T> GetByIdAsync(int id);
        IQueryable<T> Where(Expression<Func<T, bool>> expression);
        Task<bool> AnyAsync(Expression<Func<T, bool>> expression);
        Task AddAsync(T entity);
        Task AddRangeAsync(IEnumerable<T> entities);
        void Update(T entity);
        void Delete(T entity);
        void DeleteRange(IEnumerable<T> entities);
    }
}
