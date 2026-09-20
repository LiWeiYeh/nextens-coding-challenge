using Rekentool.Models;

namespace Rekentool.Services;

public interface IVruchtgebruikService
{
    VruchtgebruikResponse Calculate(VruchtgebruikRequest request);
}