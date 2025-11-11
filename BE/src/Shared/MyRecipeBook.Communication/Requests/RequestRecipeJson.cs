namespace MyRecipeBook.Communication.Requests;

public class RequestRecipeJson
{
    public string Title { get; set; } = string.Empty;
    
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; } = decimal.Zero;
}