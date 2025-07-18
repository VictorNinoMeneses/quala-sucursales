namespace QualaApi.Application.Interfaces;

public interface IAuthService
{
    string GenerateToken(string username);
    bool ValidateUser(string username, string password);
}