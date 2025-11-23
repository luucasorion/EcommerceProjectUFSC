using EcommerceProjectUFSC.Domain.Entities;

namespace EcommerceProjectUFSC.Communication.Responses;

public class ResponseGetProductJson
{
    public List<ResponseProductJson> Items { get; set; } = [];
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalItems { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalItems / PageSize);
}