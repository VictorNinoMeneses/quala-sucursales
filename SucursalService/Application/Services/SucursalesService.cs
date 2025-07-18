
using QualaApi.Application.Interfaces;
using QualaApi.Domain.Entities;
using QualaApi.Domain.Interfaces;

namespace QualaApi.Application.Services;


public class SucursalesService : ISucursalesService
{
    private readonly ISucursalesRepository _repository;

    public SucursalesService(ISucursalesRepository repository)
    {
        _repository = repository;
    }

    public Task<IEnumerable<Sucursal>> ObtenerTodosAsync() => _repository.ObtenerTodosAsync();
    public Task<Sucursal?> ObtenerPorCodigoAsync(int codigo) => _repository.ObtenerPorCodigoAsync(codigo);
    public Task CrearAsync(Sucursal sucursal) => _repository.CrearAsync(sucursal);
    public Task ActualizarAsync(Sucursal sucursal) => _repository.ActualizarAsync(sucursal);
    public Task EliminarAsync(int codigo) => _repository.EliminarAsync(codigo);
}