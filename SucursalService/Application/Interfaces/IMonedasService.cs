using QualaApi.Domain.Entities;

namespace QualaApi.Application.Interfaces;

public interface IMonedasService
{
    Task<IEnumerable<Moneda>> ObtenerTodosAsync();
}