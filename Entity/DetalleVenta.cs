// using System.Runtime.Intrinsics.X86;
using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;


namespace Entity
{
    public class DetalleVenta
    {
        [Key]
        public int DetalleVentaId { get; set; }
        public int Cantidad { get; set; }
        public float Precio { get; set; }
        public float TotalVenta { get; set; }
        public void CalcularVenta() 
        {
            TotalVenta = Cantidad*Precio;
        }

        public int ProductoId { get; set; }
        public Producto Producto { get; set; }

        public int VentaId { get; set; }
        public Venta Venta { get; set; }
        
        // public string UsuarioId { get; set; }
        // public Usuario Usuario { get; set; }
    }
}