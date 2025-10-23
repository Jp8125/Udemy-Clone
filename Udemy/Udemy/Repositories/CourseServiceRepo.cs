using System.Security.Cryptography;
using System.Security.Policy;
using Udemy.Interfaces;
using Udemy.Models;

namespace Udemy.Repositories
{
    public class CourseServiceRepo : ICourseService
    {
        private readonly ISubTopic _subtopics;
        private readonly ICourse _courses;
        private readonly ICategory _category;
        private readonly ITopic _topics;
        private readonly IMediaResources _media;
        private readonly IPurchaseItem _item;

        public CourseServiceRepo(ISubTopic subtopic, ICourse courses, ITopic topics, IMediaResources media, ICategory category, IPurchaseItem item)
        {
            _subtopics = subtopic;
            _courses = courses;
            _category = category;
            _topics = topics;
            _media = media;
            _item = item;
        }
        public async Task<object> GetCourse(int courseId)
        {
            var course = await _courses.GetById(courseId);
            var topics = await _topics.GetAll();
            var subtopics = await _subtopics.GetAll();
            var mediaresources = await _media.GetAll();
            var purchases = await _item.GetAll();
            var data = new
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
                topics = from topic in topics
                         where topic.CourseId == course.CourseId
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
            return data;
        }
    }
}
