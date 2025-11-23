namespace EcommerceProjectUFSC.Domain.Entities;

public class Product : EntityBase
{
    public string Title { get; set; } =  String.Empty;
    public string Description { get; set; } = String.Empty;
    
    public decimal Price { get; set; } = decimal.Zero;
}