using System.Runtime.InteropServices;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using System.Collections.ObjectModel;
using System.Xml;
using System.Reflection;
using System.Xml.Schema;
using System.ComponentModel.DataAnnotations;
using Datos;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Logica
{
    public class VentaService
    {
        private readonly VentaContext _context;
      public VentaService(VentaContext context)
      {
          _context = context;
      } 
      
      public GuardarVentaResponse Guardar(Venta venta)
      {
          try
          {
              var ventaAux = _context.Ventas.Find(venta.VentaId);
              if (ventaAux != null)
              {
                  return new GuardarVentaResponse($"Error de la aplicacion: La venta ya se encuentra registrada!");
              }
              venta.CalcularVenta();
              _context.Ventas.Add(venta);
              _context.SaveChanges();
              return new GuardarVentaResponse(venta);
          }
          catch (Exception e)
          {
              return new GuardarVentaResponse($"Error de la aplicacion: {e.Message}");
          }
      }

      public List<Venta> ConsultarTodos()
      {
            var ventas = _context.Ventas.Include(x => x.Cliente).ToList();
            return ventas;
            
      } 

      public int ConsultarUltimaId()
      {
    //         // var ventas = _context.Ventas.orderByDesc().FirstorDefault();;
    //         // return ventas;
    //         // var registroMasActualizado = _context.Ventas().OrderByDescending(t => t.Fecha).FirstOrDefault();
    //           var registroMasActualizado = _context.Ventas().OrderBy().LastOrDefault();                          
    //           return registroMasActualizado.VentaId;  
            var ventas = _context.Ventas.Include(x => x.Cliente).ToList();
            return ventas.Count();         
            
     } 

      public class GuardarVentaResponse 
    {
        public GuardarVentaResponse(Venta venta)
        {
            Error = false;
            Venta = venta;
        }
        public GuardarVentaResponse(string mensaje)
        {
            Error = true;
            Mensaje = mensaje;
        }
        public bool Error { get; set; }
        public string Mensaje { get; set; }
        public Venta Venta { get; set; }
    }


    public class VentaViewModel 
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
        public int VentaId { get; set; }
        public DateTime Fecha { get; set; }
        public int NumeroPaquetes { get; set; }
        public float ValorPaquete { get; set; }
        public float TotalVenta { get; set; }
        public long ClienteId { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        
    }
    
        
    }
}