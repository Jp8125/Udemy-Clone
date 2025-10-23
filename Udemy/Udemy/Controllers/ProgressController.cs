using Microsoft.AspNetCore.Mvc;
using Udemy.Dto;
using Udemy.Interfaces;
using Udemy.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Udemy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgressController : ControllerBase
    {
        private readonly IProgress _progress;

        public ProgressController(IProgress progress)
        {
            _progress = progress;
        }

        // GET api/<ProgressController>/5
        [HttpGet("userProgress")]
        public async Task<IActionResult> Get(int uid,int cid)
        {
            var ProgressData =await _progress.GetAll();
            var userProgress = from p in ProgressData where (p.Uid == uid&&p.CourseId==cid) select new { p.ProgressId, p.Uid, p.CourseId, p.Topics, p.Percentage };
          
             
                return Ok(userProgress);
            

        }

        // POST api/<ProgressController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ProgressDto value)
        {
            var progress = new Progress() {Uid=value.Uid,CourseId=value.CourseId,Topics=value.TopicId,Percentage=100,CreatedBy=value.Uid,CreatedDate=DateTime.Now };
            await _progress.Insert(progress);
            var res = new { progress.ProgressId, progress.Uid, progress.CourseId, progress.Topics, progress.Percentage };
            return Ok(res);
        }
    }
}
