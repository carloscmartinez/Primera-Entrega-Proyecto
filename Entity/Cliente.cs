using System.Security.AccessControl;
using System.Security;
using System;
using System.ComponentModel.DataAnnotations;
// using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity
{
    public class Cliente
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long ClienteId { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Telefono { get; set; }

        public List<Venta> Ventas { get; } = new List<Venta>();
    }
}