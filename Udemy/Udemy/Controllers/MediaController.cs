using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Udemy.Dto;
using Udemy.Interfaces;
using Udemy.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Udemy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class MediaController : ControllerBase
    {
        private readonly IMediaResources _media;

        public MediaController(IMediaResources media)
        {
            _media = media;
        }
        // GET: MediaController
        [HttpGet]
        
        public async Task<ActionResult> GetMedia()
        {
            var Mediasrc = await _media.GetAll();
            var res = from m in Mediasrc select new { m.MediaId, m.MediaType, m.MediaSrc, m.TopicId };
            return Ok(res);
        }

        [HttpPost]
        
        public async Task<IActionResult> Addmedia(MediaDto media)
        {

            if (media == null)
            {
                return BadRequest("enter media details");
            }
            else
            {
                var mediaDetails = new MediaResource() { MediaSrc = media.MediaSrc, MediaType = media.MediaType, TopicId = media.TopicId,CreatedBy=1,CreatedDate=DateTime.Now };
                await _media.Insert(mediaDetails);
                return Ok(new
                {
                    message = "Media added"
                });
            }
        }
    }
}
