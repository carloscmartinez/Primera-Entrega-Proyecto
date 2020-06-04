using Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace Web.Models
{
    
        public class UserInputModel
    {
        [Required]
        public int UserId { get; set; }
        [Required(ErrorMessage ="El Usuario es requerido")]
        public string Usuario { get; set; }
        [Required(ErrorMessage ="La Contraseña es requerida")]
        public string Password { get; set; }
        [Required(ErrorMessage ="El Estado es requerida")]
        public string Estado { get; set; }
        [Required(ErrorMessage ="El Nombre es requerido")] 
        public string Nombre { get; set; }
        [Required(ErrorMessage ="El Apellido es requerido")]
        public string Apellido { get; set; }
        [Required(ErrorMessage ="El Rol es requerido")]
        public string Role { get; set; }
        [Required]             
        [RegularExpression(@"^[0-9]{7,10}$", ErrorMessage = "El Telefono es solo numeros de 7 a 10 digitos")]
        public string Telefono { get; set; }
       
    }

    public class UserViewModel : UserInputModel
    {
        public UserViewModel()
        {

        }
        public UserViewModel(User user)
        {
            UserId = user.UserId;
            Usuario = user.Usuario;
            Password = user.Password;
            Estado = user.Estado;
            Nombre = user.Nombre;
            Apellido = user.Apellido;
            Role = user.Role;
            Telefono = user.Telefono;
        }       
    }
           
}