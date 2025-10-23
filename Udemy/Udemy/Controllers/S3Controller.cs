using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Udemy.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Udemy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class S3Controller : ControllerBase
    {
        private readonly IS3services _service;

        public S3Controller(IS3services service)
        {
            _service = service;
        }
        // POST api/<S3Controller>
        [HttpPost("profile")]
        
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "User")]
        public async Task<IActionResult> GetProfileUrl(IFormFile file)
        {
            if (file == null || file.Length < 0)
            {
                return BadRequest("no file specified");
            }
            else
            {

            var url=await _service.uploadtoProfile(file);

            var res = new
            {
                 message = "file uploaded",
                 url = url
            };
            return Ok(res);
            }
        }
        [HttpPost("thumbnails")]
        
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        public async Task<IActionResult> UploadThumbnails(IFormFile file)
        {
            if (file == null || file.Length < 0)
            {
                return BadRequest("no file specified");
            }
            else
            {

            var url = await _service.UploadtoThumbnail(file);

            var res = new
            {
                message = "file uploaded",
                url = url
            };
            return Ok(res);
            }
        }
        [HttpPost("Course/{name}")]
        
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        public async Task<IActionResult> UploadCourse(string name,IFormFile file)
        {
            if (file == null || file.Length < 0)
            {
                return BadRequest("no file specified");
            }
            else
            {

                var url = await _service.UploadtoCourse(file,name);

                var res = new
                {
                    message = "file uploaded",
                    url = url
                };
                return Ok(res);
            }
        }

    }
}
