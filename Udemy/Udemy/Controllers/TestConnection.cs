using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Udemy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestConnection : ControllerBase
    {
        // GET: api/<TestConnection>
        [HttpGet]
        
        public IActionResult Get()
        {
            var res = new
            {
                message = "server Connected"
            };
            return  Ok(res);
        }
    }
}
