//using System.Xml.Xsl.Runtime;
using System.Data;
using System.Xml.Serialization;
using System.Net.Http.Headers;
using System.Data.Common;
//using System.Runtime.InteropServices.WindowsRuntime;
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
    public class VentaDto
    {
        public int VentaId { get; set; }
        public long ClienteId { get; set; }
        public DateTime Fecha { get; set; }
        public string Estado{ get; set; }
        public float Total{ get; set; }
        public List<DetalleVentaDto> Detalles { get; set; } = new List<DetalleVentaDto>();
    }

    public class DetalleVentaDto
    {
        public int ProductoId { get; set; }
        public int Cantidad { get; set; }
        public float Precio { get; set; }
        public float TotalVenta { get; set; }
    }


    public class VentaService
    {
        private readonly VentaContext _context;
      public VentaService(VentaContext context)
      {
          _context = context;
      } 
      
      public GuardarVentaResponse Guardar(Venta ventDto)
      {
          try
          {
              var ventaNueva= new Venta();
              ventaNueva.VentaId=ventDto.VentaId;
              ventaNueva.Fecha=ventDto.Fecha;
              ventaNueva.Estado=ventDto.Estado;
              ventaNueva.Total=ventDto.Total;
              var cliente=_context.Clientes.Find(ventDto.ClienteId);
              //debes valirdar que exista el cliente
              if (cliente == null)
              {
                  return new GuardarVentaResponse($"Error de la aplicacion: El cliente no se encuentra registrado!");
              } 
              ventaNueva.ClienteId=ventDto.ClienteId;
              //------------------------------------
              foreach (var item in ventDto.Detalles)
              {
                  var productoVendido =_context.Productos.Find(item.ProductoId);
                  if(productoVendido !=null)
                  {
                        var detalleVenta= new DetalleVenta();
                        detalleVenta.ProductoId=item.ProductoId;
                        detalleVenta.Cantidad=item.Cantidad;
                        detalleVenta.Precio=item.Precio;
                        //detalleVenta.VentaId=ventDto.VentaId;
                        detalleVenta.CalcularVenta() ;
                        //ventaNueva.Productos.Add(detalleVenta);
                        ventaNueva.Detalles.Add(detalleVenta);
                  }
                  else
                  {
                      return new GuardarVentaResponse($"Error de la aplicacion: esta venta no contiene productos vendidos!");
                  }
              }
              
              _context.Ventas.Add(ventaNueva);
              _context.SaveChanges();
              return new GuardarVentaResponse(ventaNueva);
          }
          catch (Exception e)
          {
              return new GuardarVentaResponse($"Error de la aplicacion: {e.Message}");
          }
      }

      public List<Venta> ConsultarTodos()
      {
            var ventas = _context.Ventas.Include(x => x.Cliente).Include(d => d.Detalles).ToList();
            return ventas;
            
      } 
      //.Where(b => b.Name == "ADO.NET Blog");
      public Venta ConsultarUltimaVenta(long idCliente)
      {
            var venta = _context.Ventas.Where(b => b.ClienteId == idCliente).Include(x => x.Cliente).LastOrDefault();
            return venta;
            
      }

      public int ConsultarUltimaId()
      {
    
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


    /* public class VentaViewModel 
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
        
    } */
    
        
    }
}