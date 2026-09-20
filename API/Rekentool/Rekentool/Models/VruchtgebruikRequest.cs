using System.ComponentModel.DataAnnotations;

namespace Rekentool.Models;

public class VruchtgebruikRequest
{
    [Range(0.01, double.MaxValue)]
    public decimal Eigendomswaarde { get; set; }

    // should clarify with domain experts if there should be a (sensible) maximum age limit, for now we will use int.MaxValue
    [Range(0, int.MaxValue)]
    public int Leeftijd { get; set; }

    [EnumDataType(typeof(Geslacht), ErrorMessage = "Ongeldig geslacht.")]
    public Geslacht Geslacht { get; set; }

    [EnumDataType(typeof(Berekeningsmethode), ErrorMessage = "Ongeldige berekeningsmethode.")]
    public Berekeningsmethode Berekeningsmethode { get; set; }
}