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
    public class SubtopicsController : ControllerBase
    {
        private readonly ISubTopic _subtopic;
        private readonly ICourseService _service;

        public SubtopicsController(ISubTopic subtopic,ICourseService courseserve)
        {
            _subtopic = subtopic;
            _service = courseserve;
        }
        // GET: api/<TopicsController>
        [HttpGet]
        
        public async Task<IActionResult> GetsubTopic()
        {
            var topics = await _subtopic.GetAll();
            var res = from topic in topics select new { topic.SubTopicId, topic.ParentId, topic.Title, topic.Description,topic.Topics };
            return Ok(res);
        }

        // POST api/<TopicsController>
        [HttpPost]
        
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        public async Task<IActionResult> AddSubtopic(SubTopicDto value)
        {
            var topic = new SubTopic()
            {
                Title = value.Title,
                Description = value.Description,
                ParentId = value.ParentId,
                CreatedBy = 1,
                Topics = value.Topics,
                CreatedDate = DateTime.Now
            };
            await _subtopic.Insert(topic);
            var course = await _service.GetCourse(value.CourseId);
            return Ok(new
            {
                message = "topic added",
                   data = course
            }); 
        }

        [HttpPut("update/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        public async Task<IActionResult> UpdateSubtopic(SubTopicDto value,int id,int cid)
        {
            var subtopic =await _subtopic.GetById(id);     
            subtopic.Title = value.Title;
            subtopic.Description = value.Description;
            subtopic.ParentId = value.ParentId;
            subtopic.Topics = value.Topics;
            await _subtopic.Update(subtopic);
            var res = await _service.GetCourse(cid);
            return Ok(res);
        }
    }
}
