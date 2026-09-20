using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Rekentool.Models;
using Rekentool.Services;

namespace Rekentool.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VruchtgebruikController : ControllerBase
{
    private readonly IVruchtgebruikService _VruchtgebruikService;

    public VruchtgebruikController(
        IVruchtgebruikService vruchtgebruikService)
    {
        _VruchtgebruikService = vruchtgebruikService;
    }

    [HttpPost]
    public ActionResult<VruchtgebruikResponse> Calculate(
        VruchtgebruikRequest request)
    {
        var result = _VruchtgebruikService.Calculate(request);

        return Ok(result);
    }
}