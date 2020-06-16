using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Entity
{
    public class Producto
    {
        [Key]
        public int ProductoId { get; set; }
        public string Nombre { get; set; }
        public float Precio { get; set; }

        public List<DetalleVenta> Ventas { get; set; } = new List<DetalleVenta>();
    }
}