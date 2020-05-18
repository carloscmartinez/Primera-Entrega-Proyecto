// using System.Runtime.Intrinsics.X86;
using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Entity
{
    public class Venta
    {
        [Key]
        public string VentaId { get; set; }
        public DateTime Fecha { get; set; }
        public int NumeroPaquetes { get; set; }
        public float ValorPaquete { get; set; }
        public float TotalVenta { get; set; }
        public void CalcularVenta() 
        {
            TotalVenta = NumeroPaquetes*ValorPaquete;
        }


        public string ClienteId { get; set; }
        public Cliente Cliente { get; set; }
        
        // public string UsuarioId { get; set; }
        // public Usuario Usuario { get; set; }
    }
}