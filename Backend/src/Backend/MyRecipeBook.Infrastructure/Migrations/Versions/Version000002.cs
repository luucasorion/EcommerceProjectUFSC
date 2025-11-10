using FluentMigrator;

namespace MyRecipeBook.Infrastructure.Migrations.Versions;

[Migration(2, "Create schema to save Recipe's information")]
public class Version000002 : VersionBase   
{
    public override void Up()
    {
        CreateTable("Recipes")
            .WithColumn("Title").AsString(255).NotNullable()
            .WithColumn("Description").AsString()
            .WithColumn("Price").AsDecimal();
    }
    
}