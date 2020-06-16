using Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Models
{
    public class ProductoInputModel
    {
        [Required]
        public int ProductoId { get; set; }
        [Required(ErrorMessage ="El Nombre es requerido")]
        public string Nombre { get; set; }
        [Required(ErrorMessage ="El Nombre es requerido")]             
        public float Precio { get; set; }
             
    }

    public class ProductoViewModel : ProductoInputModel
    {
        public ProductoViewModel()
        {

        }
        public ProductoViewModel(Producto producto)
        {
            ProductoId = producto.ProductoId;
            Nombre = producto.Nombre;
            Precio = producto.Precio;
        }       
        
    }
}