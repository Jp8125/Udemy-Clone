using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Udemy.Dto;
using Udemy.Interfaces;
using Udemy.Models;
using Udemy.Models.Dto;

namespace Udemy.Repositories
{
    public class UserServicesRepo : IUserServices
    {
        private readonly UdemyContext _context;
        private readonly IConfiguration _config;
        private readonly IOtp _otp;

        public UserServicesRepo(UdemyContext context,IConfiguration config,IOtp otp)
        {
            _context=context;
            _config = config;
            _otp = otp;
        }
        public bool Check(RegisterDto userdetails)
        {
            return _context.Users.Any(user=>user.Email==userdetails.Email);
        }

        public bool Check(LoginDto loginDetails)
        {
            return _context.Users.Any(user => user.Email == loginDetails.Email || user.Name == loginDetails.Email);
        }

        public string Hash(string pw, string salt)
        {
            var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(salt));
            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(pw));
            return Convert.ToBase64String(hash);
        }

        public bool Verify(string inputpassword, string hashedpassword, string salt)
        {
            var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(salt));
            var inputhash = hmac.ComputeHash(Encoding.UTF8.GetBytes(inputpassword));
            string inputpass = Convert.ToBase64String(inputhash);
            return string.Equals(hashedpassword, inputpass, StringComparison.OrdinalIgnoreCase);
        }

        public async Task<string> Tokengenerator(User val)
        {
            var secrate = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("Jwt:Key").Value));
            var crad = new SigningCredentials(secrate, SecurityAlgorithms.HmacSha256);
            var roledata = await _context.Roles.FirstOrDefaultAsync(obj=>obj.Id==val.RoleId);
            var claims = new[]
            {
                new Claim(ClaimTypes.PrimarySid,val.Id.ToString()),
                new Claim(ClaimTypes.Name,val.Name),
                new Claim(ClaimTypes.Role,roledata.Role1),
                new Claim(ClaimTypes.Email,val.Email)
            };
            var tk = new JwtSecurityToken(
                _config.GetSection("Jwt:Issuer").Value,
                _config.GetSection("Jwt:Audience").Value, claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: crad
                );
            var token = new JwtSecurityTokenHandler().WriteToken(tk);
            return token;

        }
        public void SendMail(string To,string body)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Udemy", _config["smtp:email"]));
            message.To.Add(new MailboxAddress(To.Split('@')[0], To));
            message.Subject = "Regarding Verification";
            message.Body = new TextPart("html") { Text = body }; 
            var smtp = new SmtpClient();
            smtp.Connect(_config["smtp:server"], Convert.ToInt16(_config["smtp:port"]));
            smtp.Authenticate(_config["smtp:userId"], _config["smtp:password"]);
            smtp.Send(message);
            smtp.Disconnect(true);
            smtp.Dispose();
        }
        public int GenerateOtp()
        {
            Random rnd = new Random();
            int otpval = rnd.Next(100000, 999999);
            return otpval;
        }
        public async Task<User> Getbyemail(string email)
        {
          return  await _context.Users.FirstOrDefaultAsync(obj=>obj.Email==email);
        }
       
        public async Task<string> Verifyotp(string otp)
        {
            var otplist = await _otp.GetAll();
            var otpDetails = otplist.OrderByDescending(obj => obj.Validtill).First();
            if (otpDetails.Validtill > DateTime.Now)
            {
                if (otp == otpDetails.Otp1)
                {
                    await _otp.Delete(otpDetails);
                    return "verified";
                }
                else
                {
                    await _otp.Delete(otpDetails);
                    return "invalid";
                }
            }
            else
            {
                await _otp.Delete(otpDetails);
                return "expired";
            }
        }

        public  string GeneratePassword(UserDto user)
        {
            var password=  user.Name.Substring(0,4).ToUpper()+user.PhonNo.Substring(0,4);
            return  password;
        }

    }
}
