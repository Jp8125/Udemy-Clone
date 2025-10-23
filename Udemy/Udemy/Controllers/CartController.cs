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
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class CartController : ControllerBase
    {
        private readonly ICart _cart;

        public CartController(ICart cart)
        {
            _cart = cart;
        }
        // GET: api/<CartController>
        [HttpGet]
        
        public async Task<IActionResult> Get()
        {
            var carts =await _cart.GetAll();
            var res = from ctr in carts select new { ctr.CartId, ctr.UserId, ctr.CourseId };
            return Ok(res);
        }

        // GET api/<CartController>/5
        [HttpGet("{uid}")]
        
        public async Task<IActionResult> Get(int uid)
        {
            var cartdeta = await _cart.GetAll();
            var data = cartdeta.ToList().FindAll(obj => obj.UserId == uid);
                var res=from cart in data select new {cart.CartId,cart.UserId,cart.CourseId};
                return Ok(res);
        }

        // POST api/<CartController>
        [HttpPost]
        
        public async Task<IActionResult> Post([FromBody] CartDto value)
        {
            var cart=new Cart() { CourseId = value.CourseId,UserId=value.UserId };
            await _cart.Insert(cart);
            var res = new { cart.CartId, cart.UserId, cart.CourseId };
            return Ok(res);
        }

        // DELETE api/<CartController>/5
        [HttpDelete("{id}")]
        
        public async Task<IActionResult> Delete(int id)
        {
            var cartdeta = await _cart.GetAll();
            var data= cartdeta.FirstOrDefault(obj => obj.CartId == id);
            if (data == null)
            {
                var errormessage = new
                {
                    message = "data not found"
                };
                return BadRequest(errormessage);
            }
            else
            {
                await _cart.Delete(data);
                var res = new { data.UserId, data.CourseId, data.CartId };
                return Ok(res);
            }
        }

        [HttpDelete("remove/{uid}")]
        
        public async Task<IActionResult> RemoveCartdata(int uid)
        {
            var cartData=await _cart.GetAll();
            var dataToremove=cartData.ToList().FindAll(obj => obj.UserId == uid);
            if (dataToremove.Count==0)
            {
                return NotFound("data not found");
            }
            else
            {
                await _cart.removeMultiple(dataToremove);
                var res = new
                {
                    id = uid
                };
                return Ok(res);
            }
        }
    }
}
