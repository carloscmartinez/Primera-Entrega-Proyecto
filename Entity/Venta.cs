using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Entity
{
    public class Venta
    {
        [Key]
        public int VentaId { get; set; }
        public DateTime Fecha { get; set; }
        public string Estado{ get; set; }
        public float Total { get; set; }
        public List<DetalleVenta> Detalles { get; set;} = new List<DetalleVenta>();

        public long ClienteId { get; set; }
        public Cliente Cliente { get; set; }
    }
}