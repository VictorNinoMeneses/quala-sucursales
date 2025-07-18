using QualaApi.Application.Interfaces;
using QualaApi.Domain.Entities;
using QualaApi.Domain.Interfaces;

namespace QualaApi.Application.Services;

public class MonedasService : IMonedasService
{
    private readonly IMonedasRepository _repository;

    public MonedasService(IMonedasRepository repository)
    {
        _repository = repository;
    }

    public Task<IEnumerable<Moneda>> ObtenerTodosAsync() => _repository.ObtenerTodosAsync();
}
