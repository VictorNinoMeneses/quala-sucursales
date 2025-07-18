using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QualaApi.Application.Interfaces;
using QualaApi.Domain.Entities;

namespace QualaApi.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SucursalesController : ControllerBase
{
    private readonly ISucursalesService _sucursalesService;

    public SucursalesController(ISucursalesService sucursalesService)
    {
        _sucursalesService = sucursalesService;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> ObtenerTodos()
    {
        var sucursales = await _sucursalesService.ObtenerTodosAsync();
        return Ok(sucursales);
    }

    [HttpGet("{codigo:int}")]
    [Authorize]
    public async Task<IActionResult> ObtenerPorCodigo(int codigo)
    {
        var sucursal = await _sucursalesService.ObtenerPorCodigoAsync(codigo);
        return sucursal is null ? NotFound() : Ok(sucursal);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Crear([FromBody] Sucursal sucursal)
    {
        await _sucursalesService.CrearAsync(sucursal);
        return CreatedAtAction(nameof(Crear), new { codigo = sucursal.Codigo }, sucursal);
    }

    [HttpPut("{codigo:int}")]
    [Authorize]
    public async Task<IActionResult> Actualizar(int codigo, [FromBody] Sucursal sucursal)
    {
        if (codigo != sucursal.Codigo) return BadRequest("Código no coincide.");
        await _sucursalesService.ActualizarAsync(sucursal);
        return NoContent();
    }

    [HttpDelete("{codigo:int}")]
    [Authorize]
    public async Task<IActionResult> Eliminar(int codigo)
    {
        await _sucursalesService.EliminarAsync(codigo);
        return NoContent();
    }
}