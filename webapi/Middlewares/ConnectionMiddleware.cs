using OlympicGame.Interfaces;

namespace OlympicGame.Middlewares
{
    public class ConnectionMiddleware : IConnection
    {
        public string ConnectionStringDb { get; }

        public ConnectionMiddleware(IConfigurationRoot configuration)
        {
            ConnectionStringDb = configuration.GetConnectionString("con");
        }
    }
}
