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
       // [Required(ErrorMessage ="La fecha es requerida")]
        public DateTime Fecha { get; set; }
        [Required(ErrorMessage ="El estado de venta es requerido")]
        public string Estado { get; set; }
        [Required(ErrorMessage ="El detalle es requerido")]
        public List<DetalleVentaInputModel> Detalles { get; set; } = new List<DetalleVentaInputModel>();
        [Required]
        public float Total { get; set; }
             
        //[RegularExpression(@"^[0-9]{7,10}$", ErrorMessage = "La identificacion del cliente es solo numeros de 7 a 10 digitos")]
        public long ClienteId { get; set; }   
    }
    public class DetalleVentaInputModel
    {
        public int ProductoId { get; set; }
        public int Cantidad { get; set; }
        public float Precio { get; set; }
        //public int VentaId { get; set; }
        public float TotalVenta { get; set; }
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
            Estado = venta.Estado;
            Total = venta.Total;
            ClienteId = venta.ClienteId;
            Nombre = venta.Cliente.Nombre;
            Apellido = venta.Cliente.Apellido;
            foreach (var item in venta.Detalles)
            {    
                   var detalleVenta= new DetalleVentaViewModel();
                   detalleVenta.ProductoId=item.ProductoId;
                   detalleVenta.Cantidad=item.Cantidad;
                   detalleVenta.Precio=item.Precio;   
                   //detalleVenta.VentaId=item.VentaId;                
                   detalleVenta.TotalVenta=item.TotalVenta;
                   //ventaNueva.Productos.Add(detalleVenta);
                   DetallesView.Add(detalleVenta);
             }
            
        }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public List<DetalleVentaViewModel> DetallesView { get; set; } = new List<DetalleVentaViewModel>();
    
    }
    public class DetalleVentaViewModel
    {
        public int ProductoId { get; set; }
        public int Cantidad { get; set; }
        public float Precio { get; set; }
        //public int VentaId { get; set; }
        public float TotalVenta { get; set; }
    }
}