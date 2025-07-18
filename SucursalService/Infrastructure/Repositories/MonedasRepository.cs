using Dapper;
using QualaApi.Domain.Entities;
using QualaApi.Domain.Interfaces;
using QualaApi.Infrastructure.Data;
using System.Data;

namespace QualaApi.Infrastructure.Repositories;

public class MonedasRepository : IMonedasRepository
{
    private readonly SqlConnectionFactory _connectionFactory;

    public MonedasRepository(SqlConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IEnumerable<Moneda>> ObtenerTodosAsync()
    {
        using var conn = _connectionFactory.CreateConnection();
        return await conn.QueryAsync<Moneda>("vn_mon_obtener_todos", commandType: CommandType.StoredProcedure);
    }
}
