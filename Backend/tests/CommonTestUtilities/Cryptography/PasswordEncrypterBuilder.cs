using MyRecipeBook.Application.Services.Cryptography;

namespace CommonTestUtilities.Cryptography;

public static class PasswordEncrypterBuilder
{
    public static PasswordEncrypter Build()
    {
        return new PasswordEncrypter();
    }
}