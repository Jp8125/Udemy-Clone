using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using Udemy.Dto;
using Udemy.Interfaces;
using Udemy.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Udemy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class PurchaseController : ControllerBase
    {
        private readonly IPurchase _purchase;
        private readonly IPurchaseItem _item;
        private readonly ICourse _Courses;
        private readonly IUser _users;

        public PurchaseController(IPurchase purchase, IPurchaseItem item,ICourse course,IUser user)
        {
            _purchase = purchase;
            _item = item;
            _Courses = course;
            _users = user;
        }

        // GET api/<PurchaseController>/5
        [HttpGet("{id}")]
        
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Get(int id)
        {
            var purchase = await _purchase.GetAll();
            var items = await _item.GetAll();
            var user = purchase.Any(obj => obj.UserId == id);
            if (user)
            {
                var res = (from p in purchase
                           where
                           p.UserId == id
                           select
                           new
                           {
                               pid = p.PurchaseId,
                               date = p.PurchaseDate
                           ,
                               Courses = from i in items
                                         where i.PurchaseId == p.PurchaseId
                                         select new { i.CourseId, i.CreatedDate }
                           }).First();

                return Ok(res);
            }
            else
            {
                List<Course> list = new List<Course>();
                var res = new
                {
                    pid = 0,
                    date = DateTime.Now,
                    Courses =list

                };
                return Ok(res);
            }
          
        }

        // POST api/<PurchaseController>
        [HttpPost("buy/{uid}")]
        
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Post(int uid, [FromBody] IList<PurchaseDto> value)
        {
            var purchasevalues = await _purchase.GetAll();
            var userdata = purchasevalues.FirstOrDefault(obj => obj.UserId == uid);
            if (userdata != null)
            {
                var obj = await addData(userdata, value);
                return Ok(obj);
            }
            else
            {
                var purchaseData = new Purchase() { UserId = uid, PurchaseDate = DateTime.Now, CreatedBy = uid, CreatedDate = DateTime.Now };
                await _purchase.Insert(purchaseData);
                var insertedvalue = await _purchase.GetAll();
                var data = insertedvalue.FirstOrDefault(obj => obj.UserId == uid);
                var res = await addData(data, value);
                return Ok(res);

            }
        }

        private async Task<object> addData(Purchase data, IList<PurchaseDto> value)
        {
            IList<PurchaseItem> itemlist = new List<PurchaseItem>();
            foreach (var item in value)
            {
                itemlist.Add(new PurchaseItem() { CourseId = item.CourseId, PurchaseId = data.PurchaseId, CreatedBy = data.UserId, CreatedDate = DateTime.Now });
            }
            await _item.addMultiple(itemlist);
            var res = new
            {
                pid = data.PurchaseId,
                date = data.PurchaseDate,
                Courses = from i in itemlist  where i.PurchaseId == data.PurchaseId
                                         select new { i.CourseId, i.CreatedDate }

            };
            return res;
        }
        [HttpGet("Earnings")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        public async Task<IActionResult> GetEarnings()
        {
            var purchase = await _purchase.GetAll();
            var item = await _item.GetAll();
            var users =await _users.GetAll();
            var courses = await _Courses.GetAll();
            var res = from p in purchase
                      select new
                      {
                          p.PurchaseId,
                          userdata =( from u in users
                                     where p.UserId == u.Id
                                     select new
                                     {
                                         u.Name,
                                         u.Email
                                     }).FirstOrDefault(),
                          courses = from i in item
                                    where i.PurchaseId == p.PurchaseId
                                    join c in courses on i.CourseId equals c.CourseId
                                    select new
                                    {
                                        c.CourseId,
                                        c.Name,
                                        c.Price
                                    }

                      };


            return Ok(res);
        }
        [HttpGet("userpurchase/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "User")]
        public async Task<IActionResult> GetUsesPurchaseDetails(int id)
        {
            var purchase = await _purchase.GetAll();
            var item = await _item.GetAll();
            var users = await _users.GetAll();
            var courses = await _Courses.GetAll();
            var res = (from p in purchase
                       where p.UserId == id
                       select new
                       {
                           p.PurchaseId,
                           userdata = (from u in users
                                       where p.UserId == u.Id
                                       select new
                                       {
                                           u.Name,
                                           u.Email
                                       }).FirstOrDefault(),
                           courses = from i in item
                                     where i.PurchaseId == p.PurchaseId
                                     join c in courses on i.CourseId equals c.CourseId
                                     select new
                                     {
                                         purchaseDate=i.CreatedDate,
                                         c.CourseId,
                                         c.Name,
                                         c.Price,
                                         c.ThumbnailSrc
                                     }

                       }).FirstOrDefault();


            return Ok(res);
        }
    }
}
