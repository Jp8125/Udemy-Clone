using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Udemy.Dto;
using Udemy.Interfaces;
using Udemy.Models;

namespace Udemy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CoursesController : ControllerBase
    {
        private readonly ICourse _courses;
        private readonly ITopic _topics;
        private readonly ISubTopic _subtopics;
        private readonly IMediaResources _media;
        private readonly ICategory _category;
        private readonly IPurchaseItem _item;
        private readonly ICourseService _sevice;

        public CoursesController(ICourse courses,ITopic topics,ISubTopic subtopics,IMediaResources media,ICategory category,IPurchaseItem item,ICourseService service)
        {
            _courses = courses;
            _topics = topics;
            _subtopics = subtopics;
            _media=media;
            _category = category;
            _item = item;
            _sevice = service;
        }

        [HttpGet]
        
  
        public async Task<ActionResult> Get()
        {
            var courses = await _courses.GetAll();
            var topics = await _topics.GetAll();
            var subtopics = await _subtopics.GetAll();
            var mediaresources = await _media.GetAll();
            var purchases = await _item.GetAll();
            var courseData = from course in courses where course.Coursestatus==1 select new
            {
                course.CourseId,
                course.CategoryId,
                course.Name,
                course.Duration,
                course.Description,
                course.ThumbnailSrc,
                course.Price,
                course.CreatedDate,
                course.Coursestatus,
                popularity = (from p in purchases where p.CourseId == course.CourseId select p).Count(),
                topics = from topic in topics where topic.CourseId == course.CourseId
                         select new {topic.TopicId, topic.Title, topic.Description,
                             subtopics = from subtopic in subtopics where subtopic.Topics == topic.TopicId select new
                             {
                                 subtopic.SubTopicId,
                                 subtopic.Title,
                                 subtopic.Description,
                                 media = from media in mediaresources where media.TopicId == subtopic.SubTopicId select new
                                 {
                                    media.MediaId,
                                    media.TopicId,
                                    media.MediaSrc,
                                    media.MediaType
                                 }
                       }
                }
            };
            return Ok(courseData);

        }
        

        [HttpPost]
        
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        public async Task<IActionResult>AddCourse(CourseDto course)
        {
            var topics = await _topics.GetAll();
            var subtopics = await _subtopics.GetAll();
            var mediaresources = await _media.GetAll();
            var purchases = await _item.GetAll();
            var courseData = new Course() { 
                Name = course.Name,
                CategoryId = course.CategoryId, 
                Coursestatus = 1,
                Duration = course.Duration, 
                Description = course.Description,
                CreatedDate=DateTime.Now,
                CreatedBy=1,
                Price=course.Price,
                ThumbnailSrc=course.ThumbnailSrc
            };
            await _courses.Insert(courseData);
            var res = new
            {

                courseData.CourseId,
                courseData.CategoryId,
                courseData.Name,
                courseData.Duration,
                courseData.Description,
                courseData.ThumbnailSrc,
                courseData.Price,
                courseData.CreatedDate,
                courseData.Coursestatus,
                popularity = (from p in purchases where p.CourseId == courseData.CourseId select p).Count(),
                topics = from topic in topics
                         where topic.CourseId == courseData.CourseId
                         select new
                         {
                             topic.Title,
                             topic.Description,
                             topic.TopicId,
                             subtopics = from subtopic in subtopics
                                         where subtopic.Topics == topic.TopicId
                                         select new
                                         {
                                             subtopic.SubTopicId,
                                             subtopic.Title,
                                             subtopic.Description,
                                             media = from media in mediaresources
                                                     where media.TopicId == subtopic.SubTopicId
                                                     select new
                                                     {
                                                         media.MediaId,
                                                         media.TopicId,
                                                         media.MediaSrc,
                                                         media.MediaType
                                                     }
                                         }
                         }
            };
            return Ok(res);
        }
        [HttpPut]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        public async Task<IActionResult> DeleteCourse(int Cid)
        {
            var course =await _courses.GetById(Cid);
            course.Coursestatus = 2;
            await _courses.Update(course);
            var res = new { id = Cid };
            return Ok(res);
        }
        [HttpPut("update")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        public async Task<IActionResult> updateCourse(int cid,UpdateCourseDto data)
        {
            var course = await _courses.GetById(cid);
            course.Name = data.Name;
            course.Description = data.Description;
            course.Duration = data.Duration;
            course.Price = data.Price;
            course.CategoryId = data.CategoryId;
            await _courses.Update(course);
            var res = await _sevice.GetCourse(cid);
            return Ok(res);
        }


    }
}
