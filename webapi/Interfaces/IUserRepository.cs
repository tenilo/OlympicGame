using webapi.Models.ApiModel;
using webapi.Models.DTO;

namespace webapi.Interfaces
{
    public interface IUserRepository
    {
        void CreateUser(ClientDto client);
        Task<User> Authenticate(string username, string password);
        void ValidCommand(CommandDto command);
        Task<Historique> GetHistoCommand();
        Task<QrCode> GetQrCodeById(int id);

    }
}
