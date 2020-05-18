using Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Models
{
    public class ClienteInputModel
    {
        [Required]
        public string ClienteId { get; set; }
        [Required(ErrorMessage ="El Nombre es requerido")]
        public string Nombre { get; set; }
        [Required(ErrorMessage ="El Apellido es requerido")]
        public string Apellido { get; set; }
        // [Required(ErrorMessage ="El Telefono es requerido")]
        // [Required]
        // [SexValidation(ErrorMessage = "Especifique un sexo [M ó F]")]
        [Required]             
        [RegularExpression(@"^[0-9]{7,10}$", ErrorMessage = "El telefono es solo numeros de 7 a 10 digitos")]
        public string Telefono { get; set; }
       
    }

    public class ClienteViewModel : ClienteInputModel
    {
        public ClienteViewModel()
        {

        }
        public ClienteViewModel(Cliente cliente)
        {
            ClienteId = cliente.ClienteId;
            Nombre = cliente.Nombre;
            Apellido = cliente.Apellido;
            Telefono = cliente.Telefono;
        }
        
    }

    // public class SexValidation : ValidationAttribute
    // {
    //     protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    //     {
    //         if (Convert.ToString(value) == "M" || Convert.ToString(value) == "F")
    //             return ValidationResult.Success;
    //         else
    //             return new ValidationResult(ErrorMessage);
    //     }
    // }
}