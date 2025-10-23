using Microsoft.AspNetCore.Mvc;
using Udemy.Models.Dto;
using Udemy.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using Udemy.Interfaces;
using Org.BouncyCastle.Crypto.Macs;
using Microsoft.AspNetCore.Cors;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Udemy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UdemyContext _context;
        private readonly IUserServices _services;
        private readonly IUser _user;
        private readonly IOtp _otp;

        public AuthenticateController(UdemyContext context,IUserServices services,IUser user,IOtp otp)
        {
            _context = context;
            _services = services;
            _user = user;
            _otp = otp;
        }
        // POST api/<AuthenticateController>
        [HttpPost("register")]
        
        public async Task<IActionResult> Register([FromBody] RegisterDto registerUser)
        {
            var check =  _services.Check(registerUser);
            if (check)
            {
                return Conflict("user alredy exist");
            }
            var hmac = new HMACSHA256();
            string salt = Convert.ToBase64String(hmac.Key);
            registerUser.Password = _services.Hash(registerUser.Password, salt);
            var user = new User() {Name=registerUser.Name,Email=registerUser.Email,RoleId=2,PasswordHash=registerUser.Password,PasswordSalt=salt,CreatedDate=DateTime.Now,PhonNo=registerUser.PhonNo};
            await _user.Insert(user);
            return Ok(new { message = "user register successfully" });
        }

        // POST api/<AuthenticateController>
        [HttpPost("login")]
        
        public async Task<ActionResult> Login([FromBody] LoginDto value)
        {
            var check= _services.Check(value);
            if (check)
            {
                var userdata=_context.Users.FirstOrDefault(obj=> (obj.Email == value.Email||obj.Name==value.Email));
                var validate = _services.Verify(value.Password, userdata.PasswordHash, userdata.PasswordSalt);
                if (validate)
                {
                    var user = await _services.Getbyemail(userdata.Email);
                    var otp = _services.GenerateOtp();
                    var otpval = new Otp() { Otp1 = otp.ToString(), UserId = user.Id, Validtill = DateTime.Now.AddMinutes(2) };
                    await _otp.Insert(otpval);
                    var fs = new FileStream("./Templates/welcome.html", FileMode.Open, FileAccess.Read);
                    var sr = new StreamReader(fs);
                    var html = sr.ReadToEnd().Replace("##otp##",otp.ToString());
                    fs.Close();
                    _services.SendMail(user.Email,html);
                    return Ok(new
                    {
                        message= "otp sent success fully"
                    });
                   
                }
                else
                {
                    return BadRequest("invalid password");
                }
            }
            return BadRequest("user not found");
        }

        [HttpPost("forgotpassword")]
        
        public async Task<IActionResult> Forgot(string Email)
        {
            var user = await _services.Getbyemail(Email);
            if (user == null)
            {
                return NotFound("user not found");
            }
            else
            {

            var otp = _services.GenerateOtp();
            var otpval = new Otp() { Otp1 = otp.ToString(), UserId = user.Id, Validtill = DateTime.Now.AddMinutes(2) };
            await _otp.Insert(otpval);
            var fs = new FileStream("./Templates/Forgot.html", FileMode.Open, FileAccess.Read);
            var sr = new StreamReader(fs);
            var html = sr.ReadToEnd().Replace("##otp##", otp.ToString());
            fs.Close();
            _services.SendMail(user.Email, html);
            return Ok(new
            {
                message = "otp sent success fully"
            });
            }

        }

        [HttpPost("updatePassword")]
        
        public async Task<IActionResult> Updatepassword(string otp,string password)
        {
            var otpList = await _otp.GetAll();
            var otpDetails = otpList.OrderByDescending(obj => obj.Validtill).First();
            var userDetails = await _user.GetById((int)otpDetails.UserId);
            var result =await _services.Verifyotp(otp);
            if (result == "verified")
            {
                var hmac = new HMACSHA256();
                var salt = Convert.ToBase64String(hmac.Key);
                var hash = _services.Hash(password, salt);
                userDetails.PasswordHash = hash;
                userDetails.PasswordSalt = salt;
                await _user.Update(userDetails);
                return Ok(new
                {
                    message = "user password reset success"
                });
            }
            else
            {
                if (result == "invalid")
                {
                    return BadRequest("invalid otp");
                }
                else
                {
                    return BadRequest("otp expired");

                }
            }
        }

        [HttpPost("verify")]
        
        public async Task<IActionResult>Velidate(string otp)
        {
            var otplist = await _otp.GetAll();
            var otpDetails = otplist.OrderByDescending(obj => obj.Validtill).First();
            var userDetails = await _user.GetById((int)otpDetails.UserId);
            var res =await _services.Verifyotp(otp);
            if(res== "verified")
            {
                string token = await _services.Tokengenerator(userDetails);
                return Ok(new
                {
                    Token = token,
                    Message = "user login success"
                });
            }
            else
            {
                if (res == "invalid")
                {
                    return BadRequest("invalid otp");
                }
                else
                {
                    return BadRequest("otp expired");
                    
                }
            }
          
        }
    }
  
}
