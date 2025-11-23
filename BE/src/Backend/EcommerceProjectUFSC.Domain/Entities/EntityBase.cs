namespace EcommerceProjectUFSC.Domain.Entities;

public class EntityBase
{
    public long Id { get; set; }
    public bool Active { get; set; } = true;
    
    public DateTime Createdon { get; set; } = DateTime.UtcNow;
}