using Microsoft.AspNetCore.Mvc;
using QualaApi.Application.Interfaces;
using QualaApi.Models;
namespace QualaApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly IAuthService _authService;

    public AuthController(IConfiguration configuration, IAuthService authService)
    {
        _configuration = configuration;
        _authService = authService;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        if (_authService.ValidateUser(request.Username, request.Password))
        {
            var token = _authService.GenerateToken(request.Username);
            return Ok(new { token });
        }

        return Unauthorized("Credenciales inválidas");
    }
}
