using Dapper;
using OlympicGame.Constants;
using OlympicGame.Interfaces;
using System.Data;
using System.Data.SqlClient;
using webapi.Models.ApiModel;
using webapi.Models.DTO;

namespace OlympicGame.Repositories
{
    public class OffreRepository : IOffreRepository
    {
        private readonly IConnection _connection;

        public OffreRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<Offre>> GetAll()
        {
            try
            {
                var requete = StoredProcNames.GetAllOffres;
                using (SqlConnection db = new SqlConnection(_connection.ConnectionStringDb))
                {
                     return await db.QueryAsync<Offre>(requete,commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception error)
            {
                throw new Exception($"Une erreur s'est produite lors de la récupération des tickets: {error}");
            }

        }
        public void Create(OffreDto offre)
        {
            try
            {
                var requete = StoredProcNames.CreateOffre;
                var parameters = new
                {
                    Type = offre.Type,
                    Description = offre.Description,
                    Price = Convert.ToDouble(offre.Price),
                    Access = Convert.ToInt16(offre.Access)
                };
                using (SqlConnection db = new SqlConnection(_connection.ConnectionStringDb))
                {
                    db.Query(requete, parameters, commandType: CommandType.StoredProcedure);
                }
            }

            catch (Exception error)
            {
                throw new Exception($"Une erreur s'est produite lors de la création du ticket: {error}");
            }

        }

        public void Update(Offre offre)
        {
            try
            {
                var requete = StoredProcNames.UpdateOffre;
                var parameters = new
                {
                    OfferId = offre.OfferId,
                    Type = offre.Type,
                    Description = offre.Description,
                    Price = Convert.ToDouble(offre.Price),
                    Access = Convert.ToInt16(offre.Access)
                };
                using (SqlConnection db = new SqlConnection(_connection.ConnectionStringDb))
                {
                    db.Query(requete, parameters, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception error)
            {
                throw new Exception($"Une erreur s'est produite lors de la mise à jour du ticket: {error}");
            }
        }
        public void Delete(int id)
        {
            try
            {
                var requete = StoredProcNames.DeleteOffre;
                var parameters = new
                {
                    OfferId = id
                    
                };
                using (SqlConnection db = new SqlConnection(_connection.ConnectionStringDb))
                {
                    db.Query(requete, parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    
                }

            }
            catch (Exception error)
            {
                throw new Exception($"Une erreur s'est produite lors de la suppression du ticket: {error}");
            }
        }

       


    }
}
