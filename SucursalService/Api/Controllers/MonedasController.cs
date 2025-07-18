using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QualaApi.Application.Interfaces;

namespace QualaApi.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MonedasController : ControllerBase
{
    private readonly IMonedasService _monedasService;

    public MonedasController(IMonedasService service)
    {
        _monedasService = service;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> ObtenerTodos()
    {
        var monedas = await _monedasService.ObtenerTodosAsync();
        return Ok(monedas);
    }
}