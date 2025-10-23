using Udemy.Dto;
using Udemy.Models;
using Udemy.Models.Dto;

namespace Udemy.Interfaces
{
    public interface IUserServices
    {
        public string Hash(string pw, string salt);
        public bool Verify(string inputpassword, string hashedpassword, string salt);
        public bool Check(RegisterDto userdetails);
        public bool Check(LoginDto loginDetails);
        public Task<string> Tokengenerator(User val);
        public void SendMail(string To,string body);
        public int GenerateOtp();
        public Task<User> Getbyemail(string email);
        public Task<string> Verifyotp(string otp);
        public string GeneratePassword(UserDto user);

    }
}
