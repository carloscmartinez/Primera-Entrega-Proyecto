using System.ComponentModel.DataAnnotations;
// using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Entity
{
    public class Usuario
    {
        [Key]
        public string UsuarioId { get; set; }
        public string Nombre { get; set; }
        public string NombreUsuario { get; set; }
        public string Password { get; set; }
        
        // public List<Venta> Ventas { get; set; }
    }
}