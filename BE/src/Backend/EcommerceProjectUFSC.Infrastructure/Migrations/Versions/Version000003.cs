using FluentMigrator;

namespace EcommerceProjectUFSC.Infrastructure.Migrations.Versions;
[Migration(3, "Change Schema Recipe to Product")]

public class Version000003 : VersionBase
{ 
    public override void Up()
    {
        Rename.Table("Recipes").To("Product");
    }
}
 
