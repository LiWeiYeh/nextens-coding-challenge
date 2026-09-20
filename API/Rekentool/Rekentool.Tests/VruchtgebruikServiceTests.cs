using Rekentool.Services;
using Rekentool.Models;

namespace Rekentool.Tests;

public class VruchtgebruikServiceTests
{
    private readonly VruchtgebruikService _service = new();

    [Fact]
    public void Calculate_ManAge23_ReturnsFactor22()
    {
        var request = new VruchtgebruikRequest
        {
            Eigendomswaarde = 100000,
            Leeftijd = 23,
            Geslacht = Geslacht.Man,
            Berekeningsmethode = Berekeningsmethode.EenLeven
        };

        var result = _service.Calculate(request);

        Assert.Equal(22, result.Factor);
    }

    [Fact]
    public void Calculate_ManAge24_ReturnsFactor22()
    {
        var request = new VruchtgebruikRequest
        {
            Eigendomswaarde = 100000,
            Leeftijd = 24,
            Geslacht = Geslacht.Man,
            Berekeningsmethode = Berekeningsmethode.EenLeven
        };

        var result = _service.Calculate(request);

        Assert.Equal(22, result.Factor);
    }

    [Fact]
    public void Calculate_ManAge25_ReturnsFactor21()
    {
        var request = new VruchtgebruikRequest
        {
            Eigendomswaarde = 100000,
            Leeftijd = 25,
            Geslacht = Geslacht.Man,
            Berekeningsmethode = Berekeningsmethode.EenLeven
        };

        var result = _service.Calculate(request);

        Assert.Equal(21, result.Factor);
    }

    [Fact]
    public void Calculate_ManAge29_ReturnsFactor21()
    {
        var request = new VruchtgebruikRequest
        {
            Eigendomswaarde = 100000,
            Leeftijd = 29,
            Geslacht = Geslacht.Man,
            Berekeningsmethode = Berekeningsmethode.EenLeven
        };

        var result = _service.Calculate(request);

        Assert.Equal(21, result.Factor);
    }

    [Fact]
    public void Calculate_ManAge30_ReturnsFactor20()
    {
        var request = new VruchtgebruikRequest
        {
            Eigendomswaarde = 100000,
            Leeftijd = 30,
            Geslacht = Geslacht.Man,
            Berekeningsmethode = Berekeningsmethode.EenLeven
        };

        var result = _service.Calculate(request);

        Assert.Equal(20, result.Factor);
    }

    [Fact]
    public void Calculate_ManAge31_ReturnsFactor20()
    {
        var request = new VruchtgebruikRequest
        {
            Eigendomswaarde = 100000,
            Leeftijd = 31,
            Geslacht = Geslacht.Man,
            Berekeningsmethode = Berekeningsmethode.EenLeven
        };

        var result = _service.Calculate(request);

        Assert.Equal(20, result.Factor);
    }

    [Fact]
    public void Calculate_WomanAge29_ReturnsFactor22()
    {
        var request = new VruchtgebruikRequest
        {
            Eigendomswaarde = 100000,
            Leeftijd = 29,
            Geslacht = Geslacht.Vrouw,
            Berekeningsmethode = Berekeningsmethode.EenLeven
        };

        var result = _service.Calculate(request);

        Assert.Equal(22, result.Factor);
    }

    [Fact]
    public void Calculate_WomanAge30_ReturnsFactor21()
    {
        var request = new VruchtgebruikRequest
        {
            Eigendomswaarde = 100000,
            Leeftijd = 30,
            Geslacht = Geslacht.Vrouw,
            Berekeningsmethode = Berekeningsmethode.EenLeven
        };

        var result = _service.Calculate(request);

        Assert.Equal(21, result.Factor);
    }

    [Fact]
    public void Calculate_ReturnsCorrectVruchtgebruikwaarde()
    {
        var request = new VruchtgebruikRequest
        {
            Eigendomswaarde = 100000,
            Leeftijd = 35,
            Geslacht = Geslacht.Man,
            Berekeningsmethode = Berekeningsmethode.EenLeven
        };

        var result = _service.Calculate(request);

        Assert.Equal(20, result.Factor);
        Assert.Equal(80000, result.Vruchtgebruikwaarde);
    }

    [Fact]
    public void Calculate_WithDifferentOwnershipValue_ReturnsCorrectValue()
    {
        var request = new VruchtgebruikRequest
        {
            Eigendomswaarde = 250000,
            Leeftijd = 35,
            Geslacht = Geslacht.Man,
            Berekeningsmethode = Berekeningsmethode.EenLeven
        };

        var result = _service.Calculate(request);

        Assert.Equal(20, result.Factor);
        Assert.Equal(200000, result.Vruchtgebruikwaarde);
    }
}