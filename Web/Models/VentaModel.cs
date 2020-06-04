using System.Reflection;
using Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;



namespace Web.Models
{
    public class VentaInputModel
    {
        [Required]
        public int VentaId { get; set; }
        // [DataType]
        [Required(ErrorMessage ="La fecha es requerida")]
        public DateTime Fecha { get; set; }
        [Required(ErrorMessage ="El numero de paquetes es requerido")]
        public int NumeroPaquetes { get; set; }
        [Required(ErrorMessage ="El valor del paquete es requerido")]
        public float ValorPaquete { get; set; }
        [Required]
        public float TotalVenta { get; set; }
             
        [RegularExpression(@"^[0-9]{7,10}$", ErrorMessage = "La identificacion del cliente es solo numeros de 7 a 10 digitos")]
        public long ClienteId { get; set; }
       
    }

    public class VentaViewModel : VentaInputModel
    {
        public VentaViewModel()
        {

        }
        public VentaViewModel(Venta venta)
        {
            VentaId = venta.VentaId;
            Fecha = venta.Fecha;
            NumeroPaquetes = venta.NumeroPaquetes;
            ValorPaquete = venta.ValorPaquete;
            TotalVenta = venta.TotalVenta;
            ClienteId = venta.ClienteId;
            Nombre = venta.Cliente.Nombre;
            Apellido = venta.Cliente.Apellido;
        }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        
    }
}