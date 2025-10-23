using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Udemy.Dto;
using Udemy.Interfaces;
using Udemy.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Udemy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategory _category;

        public CategoriesController(ICategory category)
        {
            _category = category;
        }
        // GET: api/<CategoriesController>
        [HttpGet]
        
        public async Task<IActionResult> Get()
        {

            return Ok(Getnested(null));
        }
        private async IAsyncEnumerable<object> Getnested(int? parentId)

        {
            var cat = await _category.GetAll();
            var categories = from c in cat where c.ParentCategoryId == parentId select new { c.CategoryId, c.CategoryName,c.ParentCategoryId };
            foreach (var item in categories)
            {

                List<object> list = new List<object>();
                await foreach (var item1 in Getnested(item.CategoryId))
                {
                    list.Add(item1);
                }
              
               
                    yield return new { item.CategoryId, item.CategoryName, SubCourses = list,item.ParentCategoryId };
                
            }
        }

        [HttpGet("allcategories")]
        
        public async Task<IActionResult> getAll()
        {
            var categories = await _category.GetAll();
            var subcategory = from category in categories select new { category.CategoryId, category.CategoryName, category.ParentCategoryId };
            return Ok(subcategory);
        }
       
        [HttpPost]
        
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        public async Task<IActionResult> Addcategory(CategoryDto category)
        {
            var categoryData = new Category() { CategoryName = category.CategoryName, ParentCategoryId = category.ParentCategoryId, CreatedBy = 1, CreatedDate = DateTime.Now };
           await _category.Insert(categoryData);
            return Ok(new
            {
                message="new category added"
            });

        }

    }
}
