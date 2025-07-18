using QualaApi.Domain.Entities;

namespace QualaApi.Domain.Interfaces;

public interface IMonedasRepository
{
    Task<IEnumerable<Moneda>> ObtenerTodosAsync();
}