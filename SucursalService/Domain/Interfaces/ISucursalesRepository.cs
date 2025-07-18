using QualaApi.Domain.Entities;

namespace QualaApi.Domain.Interfaces;

public interface ISucursalesRepository
{
    Task<IEnumerable<Sucursal>> ObtenerTodosAsync();
    Task<Sucursal?> ObtenerPorCodigoAsync(int codigo);
    Task CrearAsync(Sucursal sucursal);
    Task ActualizarAsync(Sucursal sucursal);
    Task EliminarAsync(int codigo);
}