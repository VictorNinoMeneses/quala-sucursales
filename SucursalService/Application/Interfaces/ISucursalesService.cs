using QualaApi.Domain.Entities;

namespace QualaApi.Application.Interfaces;

/// <summary>
/// Descripción del método
/// </summary>
public interface ISucursalesService
{
    Task<IEnumerable<Sucursal>> ObtenerTodosAsync();
    Task<Sucursal?> ObtenerPorCodigoAsync(int codigo);
    Task CrearAsync(Sucursal sucursal);
    Task ActualizarAsync(Sucursal sucursal);
    Task EliminarAsync(int codigo);
}
