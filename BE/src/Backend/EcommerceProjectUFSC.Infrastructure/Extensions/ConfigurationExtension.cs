using Microsoft.Extensions.Configuration;

namespace EcommerceProjectUFSC.Infrastructure.Extensions;

public static class ConfigurationExtension
{
    public static string ConnectionString(this IConfiguration configuration)
    {
        var connectionStringTemplate = configuration.GetConnectionString("ConnectionSQLServer")!;
        var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");
        var connectionString = connectionStringTemplate.Replace("{DB_PASSWORD}", dbPassword);
        
        return connectionString;
    }

    public static bool IsUnitTestEnviroment(this IConfiguration configuration)
    {
        return configuration.GetValue<bool>("InMemoryTest");
    }
}