using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class User
    {
        [Key]
        public int UserId { get; set; } 
        public string Usuario { get; set; }
        public string Password { get; set; }
        public string Estado { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Role { get; set; }
        public string Telefono { get; set; }        
    }
}