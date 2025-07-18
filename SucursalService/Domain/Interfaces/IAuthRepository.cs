namespace QualaApi.Domain.Interfaces;

public interface IAuthRepository
{
    bool UserExists(string username, string password);
}