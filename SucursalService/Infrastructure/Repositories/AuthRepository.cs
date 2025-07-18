using QualaApi.Domain.Interfaces;

namespace QualaApi.Infrastructure.Repositories;

public class AuthRepository : IAuthRepository
{
    public bool UserExists(string username, string password)
    {
        return username == "admin" && password == "1234";
    }
}