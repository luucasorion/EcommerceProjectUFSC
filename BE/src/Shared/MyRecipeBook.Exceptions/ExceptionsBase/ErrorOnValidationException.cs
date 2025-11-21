namespace EcommerceProjectUFSC.Exceptions.ExceptionsBase;

public class ErrorOnValidationException : EcommerceProjectUFSCException
{
    public IList<string> ErrorMessages { get; set; }

    public ErrorOnValidationException(IList<string> errorMessages) : base(string.Empty)
    {
        ErrorMessages = errorMessages;
    }
}