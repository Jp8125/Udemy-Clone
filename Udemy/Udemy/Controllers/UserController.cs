using Amazon.S3.Transfer;
using Amazon.S3;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using Udemy.Dto;
using Udemy.Interfaces;
using Udemy.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using System.Data;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Udemy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUser _user;
        private readonly IUserServices _service;

        public UserController(IUser user,IUserServices service)
        {
            _user = user;
            _service = service;
        }
        // GET: api/<UserController>
        [HttpGet]
        
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Get()
        {
            var users = await _user.GetAll();
            var res = from user in users where user.Id!=1 select  new { user.Id, user.Name, user.PhonNo, user.Email,user.ProfileUrl };
            return Ok(res);
        }

        // POST api/<UserController>
        [HttpPost]
        
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        public async Task<IActionResult> Post(UserDto userValues)
        {
            if (userValues == null)
            {
               return BadRequest("user values not provided");
            }
            var check =await _service.Getbyemail(userValues.Email);
            if(check != null)
            {
                return BadRequest("user alredy exist");
            }
            var hmac = new HMACSHA256();
            var salt = Convert.ToBase64String(hmac.Key);
            var pw = _service.GeneratePassword(userValues);
            var fs = new FileStream("./Templates/usermail.html", FileMode.Open, FileAccess.Read);
            var sr = new StreamReader(fs);
            var html = sr.ReadToEnd().Replace("##user##",userValues.Name);
            fs.Close();
            _service.SendMail(userValues.Email, html);
            var passwordhash = _service.Hash(pw, salt);
            var user=new User() { 
                Email = userValues.Email
                ,Name=userValues.Name
                ,PhonNo=userValues.PhonNo
                ,PasswordHash=passwordhash
                ,PasswordSalt=salt
                ,CreatedBy=1
                ,CreatedDate=DateTime.Now
                ,RoleId=2 };
            await _user.Insert(user);
            return Ok(new
            {
                message = "user added success fully"
            });
        }


        [HttpGet("id")]
        
        public async Task<IActionResult> GetById(int id)
        {
            var user =await _user.GetById(id);
            if (user == null)
            {
                return BadRequest("user not found");
            }
            else
            {
                var res = new
                {
                    user.Id,
                    user.Email,
                    user.Name,
                    user.PhonNo,
                    user.ProfileUrl
                };
                return Ok(res);
            }
        }

        [HttpPut]
        
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "User")]
        public async Task<IActionResult> UpdateUser(int id,UpdateUserDto data)
        {
            var user = await _user.GetById(id);
            if (user == null)
            {
                return NotFound("usr not found");
            }
            else
            {
                user.Name = data.FirstName +" "+ data.LastName;
                user.Email = data.Email;
                user.PhonNo = data.PhonNo;
                await _user.Update(user);
                var res = new
                {
                    user.Id,
                    user.Email,
                    user.Name,
                    user.PhonNo,
                    user.ProfileUrl
                };
                return Ok(res);
            }
            
        }
        [HttpPut("profile")]
        
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "User")]
        public async Task<IActionResult> UpdateProfile( int id,string url)
        {
            var user=await _user.GetById(id);
                user.ProfileUrl = url;
                await _user.Update(user);
                var res = new
                {
                    message = "Profile Updated"
                };
                return Ok(res);
         }
           
        

    }
}
