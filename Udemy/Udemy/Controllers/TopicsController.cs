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
    public class TopicsController : ControllerBase
    {
        private readonly ITopic _topic;
        private readonly ISubTopic _subtopic;
        private readonly ICourseService _service;

        public TopicsController(ITopic topic,ISubTopic subtopic,ICourseService service)
        {
            _topic = topic;
            _subtopic = subtopic;
            _service = service;
        }
        // GET: api/<TopicsController>
        [HttpGet]
        
        public async Task<IActionResult> Get()
        {
            var topics = await _topic.GetAll();
            var res = from topic in topics select new { topic.TopicId, topic.Description,topic.Title,topic.CourseId };
            return Ok(res);
        }



        // POST api/<TopicsController>
        [HttpPost]
        
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        public async Task<IActionResult> Post(TopicsDto value)
        {
            var topic=new Topic() { Title = value.Title,CourseId=value.CourseId,Description=value.Description,CreatedBy=1,CreatedDate=DateTime.Now };
            await _topic.Insert(topic);
            var course =await _service.GetCourse(value.CourseId);
            return Ok(new
            {
                message = "topic added",
                data=course
            }); ;
        }
       

    }
}
