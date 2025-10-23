using System.ComponentModel.DataAnnotations;

namespace Udemy.Models.Dto
{
    public class LoginDto
    {

        [Required(ErrorMessage = "email required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password required")]
        public string Password { get; set; }
    }
}
