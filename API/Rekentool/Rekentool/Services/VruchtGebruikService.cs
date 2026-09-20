using Rekentool.Models;

namespace Rekentool.Services;

public class VruchtgebruikService : IVruchtgebruikService
{
    public VruchtgebruikResponse Calculate(VruchtgebruikRequest request)
    {
        if (request.Berekeningsmethode == Berekeningsmethode.EenLeven)
        {
            int factor = DetermineFactor(request.Leeftijd, request.Geslacht);

            decimal vruchtgebruikwaarde = Math.Round(request.Eigendomswaarde * 0.04m * factor, 2);

            return new VruchtgebruikResponse
            {
                Eigendomswaarde = request.Eigendomswaarde,
                Factor = factor,
                Vruchtgebruikwaarde = vruchtgebruikwaarde
            };
        }

        throw new ArgumentException("Ongeldige berekeningsmethode.");
    }

    private static int DetermineFactor(int leeftijd, Geslacht geslacht)
    {
        int effectieveLeeftijd = leeftijd;

        if (geslacht == Geslacht.Vrouw)
        {
            // Should ask the domain expert what would happen if the age is less than 5, but that does not make sense in this context.
            effectieveLeeftijd -= 5;
        }

        return effectieveLeeftijd switch
        {
            // In reality, you would have a more complex logic here based on actuarial tables or other domain-specific rules.
            <= 24 => 22,
            <= 29 => 21,
            _ => 20
        };
    }
}
