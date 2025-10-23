using System.ComponentModel.DataAnnotations;

namespace Udemy.Models.Dto
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "Name required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "email required"), EmailAddress(ErrorMessage = "enter valid email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Mobile number required"), MaxLength(10)]
        public string PhonNo { get; set; }

        [Required(ErrorMessage = "Password required")]
        public string Password { get; set; }
    }
}
