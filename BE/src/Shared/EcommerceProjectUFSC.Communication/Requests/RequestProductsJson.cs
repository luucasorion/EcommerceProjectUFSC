namespace EcommerceProjectUFSC.Communication.Requests;

public class RequestProductsJson
{
    public string Title { get; set; } = string.Empty;
    
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; } = decimal.Zero;
}