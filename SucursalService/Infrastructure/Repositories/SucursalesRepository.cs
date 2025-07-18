using Dapper;
using QualaApi.Domain.Entities;
using QualaApi.Domain.Interfaces;
using QualaApi.Infrastructure.Data;
using System.Data;

namespace QualaApi.Infrastructure.Repositories;

public class SucursalesRepository : ISucursalesRepository
{
    private readonly SqlConnectionFactory _connectionFactory;

    public SucursalesRepository(SqlConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IEnumerable<Sucursal>> ObtenerTodosAsync()
    {
        using var conn = _connectionFactory.CreateConnection();
        return await conn.QueryAsync<Sucursal>("vn_suc_obtener_todos", commandType: CommandType.StoredProcedure);
    }

    public async Task<Sucursal?> ObtenerPorCodigoAsync(int codigo)
    {
        using var conn = _connectionFactory.CreateConnection();
        return await conn.QueryFirstOrDefaultAsync<Sucursal>("vn_suc_obtener_por_codigo", new { codigo }, commandType: CommandType.StoredProcedure);
    }

    public async Task CrearAsync(Sucursal sucursal)
    {
        using var conn = _connectionFactory.CreateConnection();

        await conn.ExecuteAsync("vn_suc_insertar", sucursal, commandType: CommandType.StoredProcedure);
    }

    public async Task ActualizarAsync(Sucursal sucursal)
    {
        using var conn = _connectionFactory.CreateConnection();
        await conn.ExecuteAsync("vn_suc_actualizar", sucursal, commandType: CommandType.StoredProcedure);
    }

    public async Task EliminarAsync(int codigo)
    {
        using var conn = _connectionFactory.CreateConnection();
        await conn.ExecuteAsync("vn_suc_eliminar", new { codigo }, commandType: CommandType.StoredProcedure);
    }
}
