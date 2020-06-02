using System.ComponentModel.DataAnnotations;

namespace Web.Models
{
        public class LoginInputModel
    {
        [Required]
        public string Usuario { get; set; }

        [Required]
        public string Password { get; set; }
    }

    public class LoginViewModel
    {
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Usuario { get; set; }
        public string Token { get; set; }
    }

}