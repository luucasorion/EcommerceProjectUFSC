namespace EcommerceProjectUFSC.Exceptions.ExceptionsBase;

public class InvalidLoginException : EcommerceProjectUFSCException
{
    public InvalidLoginException() : base(ResourceMessegesException.EMAIL_OR_PASSWORD_INVALID)
    {
    }
}