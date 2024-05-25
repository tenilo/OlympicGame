using webapi.Models.ApiModel;
using webapi.Models.DTO;

namespace OlympicGame.Interfaces
{
    public interface IOffreRepository
    {
        
        Task<IEnumerable<Offre>> GetAll();
        void Create(OffreDto ticket);
        void Update(Offre ticket);
        void Delete(int id);
    }
}
