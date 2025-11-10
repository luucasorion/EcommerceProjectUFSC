namespace MyRecipeBook.Exceptions.ExceptionsBase;

public class InvalidLoginException : MyRecipeBookException
{
    public InvalidLoginException() : base(ResourceMessegesException.EMAIL_OR_PASSWORD_INVALID)
    {
    }
}