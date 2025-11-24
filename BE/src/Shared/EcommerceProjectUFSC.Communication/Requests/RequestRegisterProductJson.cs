namespace EcommerceProjectUFSC.Communication.Requests;

public class RequestRegisterProductJson
{
    public string Title { get; set; } = string.Empty;
    
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; } = decimal.Zero;
}