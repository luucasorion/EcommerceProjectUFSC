namespace EcommerceProjectUFSC.Exceptions.ExceptionsBase;

public class ProductNotFound : EcommerceProjectUFSCException
{
    public ProductNotFound() : base(ResourceMessegesException.PRODUCT_NOT_FOUND)
    {
    }
}