using OlympicGame.Constants;
using OlympicGame.Interfaces;
using System.Data.SqlClient;
using System.Data;
using webapi.Interfaces;
using webapi.Models.DTO;
using Dapper;
using webapi.Models.ApiModel;


namespace webapi.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IConnection _connection;
        public UserRepository(IConnection connection)
        {
            _connection = connection;
        }
        public void CreateUser(ClientDto client)
        {
            try
            {
                byte[] passwordHash, passwordSalt;
                // validation
                if (string.IsNullOrWhiteSpace(client.Password))
                    throw new Exception("Password is required");
                var resultUser = GetUsers().Any(x => x.UserName == client.UserName);
                if (resultUser)
                    throw new Exception("Username \"" + client.UserName + "\" is already taken");

                CreatePasswordHash(client.Password, out passwordHash, out passwordSalt);
                var requete = StoredProcNames.CreateUser;
                var parameters = new
                {
                    
                    FirstName = client.FirstName,
                    LastName = client.LastName,
                    UserName = client.UserName,
                    Email = client.Email,
                    PassWordHash = passwordHash,
                    PasswordSalt = passwordSalt
                    

                };
                using (SqlConnection db = new SqlConnection(_connection.ConnectionStringDb))
                {
                    db.Query(requete, parameters, commandType: CommandType.StoredProcedure);
                }
            }

            catch (Exception error)
            {
                throw new Exception($"Une erreur s'est produite lors de la creation de l'utilisateur: {error}");
            }
        }

        public async Task<User> Authenticate(string username, string password)
        {
            try
            {
                if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                    return null;

                var user = GetUsers().SingleOrDefault(x => x.UserName == username);

                // Verifie si username existe
                if (user == null)
                    return null;

                // Verifie si le mot de passe est correcte
                if (!VerifyPasswordHash(password, user.PassWordHash, user.PassWordSalt))
                    return null;

                // retoune user si authentication reussie
                return user;
            }
            
            catch (Exception error)
            {
                throw new Exception($"Une erreur s'est produite l'authentification de l'utilisateur: {error}");
            }
        }

        private IEnumerable<User> GetUsers()
        {
            try
            {
                var requete = StoredProcNames.GetUsers;
                
                using (SqlConnection db = new SqlConnection(_connection.ConnectionStringDb))
                {
                   return db.Query<User>(requete, commandType: CommandType.StoredProcedure);
                }
            }

            catch (Exception error)
            {
                throw new Exception($"Une erreur s'est produite lors de la récupèration des utilisateurs : {error}");
            }

        }

       
        public void ValidCommand(CommandDto command)
        {
            if (command == null) throw new ArgumentNullException("command");
            try
            {
                DataTable dtTicketFormat = new DataTable();
                dtTicketFormat = PrepareTicketFormatTable(command.Tickets.ToList());
                var requete = StoredProcNames.CreateCommand;
                var parameters = new
                {
                    UserId = Convert.ToInt16(command.user.UserId),
                    Resume = command.Resume.ToString(),
                    CreationDate = (DateTime?)command.Date,
                    Total = Convert.ToDouble(command.Total),
                    CommandTableType = dtTicketFormat
                    
                };
                using (SqlConnection db = new SqlConnection(_connection.ConnectionStringDb))
                {
                    db.Query(requete, parameters, commandType: CommandType.StoredProcedure);
                }
            }

            catch (Exception error)
            {
                throw new Exception($"Une erreur s'est produite lors de la validation de la commande : {error}");
            }
        }

        public async Task<Historique> GetHistoCommand()
        {
            try
            {
                var requete = StoredProcNames.GetHistoCommand;
                using (SqlConnection db = new SqlConnection(_connection.ConnectionStringDb))
                {
                    var result = await db.QueryAsync(requete, commandType: CommandType.StoredProcedure);
                    Historique historique = new Historique();
                    List<Offre> ticketList = new List<Offre>();
                    int somme = 0;
                    foreach (var item in result)
                    {
                        somme =somme + (int)item.quantity;
                        var ticket = new Offre()
                        {
                            Type = (string)item.type,
                            Quantity = (int)item.quantity,
                            Price = (double)item.price

                        };
                        ticketList.Add(ticket);
                    }
                    historique.Total = somme;
                    historique.Tickets = ticketList;

                    return historique;
                }
            }
            catch (Exception error)
            {
                throw new Exception($"Une erreur s'est produite lors de la récupération de l'historique des ventes : {error}");
            }

        }

        public async Task<QrCode> GetQrCodeById(int id)
        {
            try
            {
                var requete = StoredProcNames.GetQrCode;
                var parameters = new
                {
                    UserId = id

                };
                using (SqlConnection db = new SqlConnection(_connection.ConnectionStringDb))
                {
                    var result = await db.QueryAsync<QrCode>(requete, parameters, commandType: CommandType.StoredProcedure);
                    return result.FirstOrDefault();
                }

            }
            catch (Exception error)
            {
                throw new Exception($"Une erreur s'est produite lors de la récupération du ticket: {error}");
            }
        }
        private DataTable PrepareTicketFormatTable(List<Offre> tickets)
        {
            DataTable dtTicketFormat = new DataTable();
            dtTicketFormat.Columns.Add("offerId", typeof(int));
            dtTicketFormat.Columns.Add("quantity", typeof(int));
            
            tickets.ForEach(x =>
            {
                dtTicketFormat.Rows.Add(x.OfferId,x.Quantity);
            });
            return (dtTicketFormat);
        }
        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }


    }
}
