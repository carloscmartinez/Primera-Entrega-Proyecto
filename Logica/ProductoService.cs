using System.Net.Http;
using Datos;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Logica
{
    public class ProductoService
    {
        private readonly VentaContext _context;
      public ProductoService(VentaContext context)
      {
          _context = context;
      } 
      
      public GuardarProductoResponse Guardar(Producto producto)
      {
          try
          {
              _context.Productos.Add(producto);
              _context.SaveChanges();
              return new GuardarProductoResponse(producto);
          }
          catch (Exception e)
          {
              return new GuardarProductoResponse($"Error de la aplicacion: {e.Message}");
          }
      }

      public List<Producto> ConsultarTodos()
      {
          List<Producto> productos = _context.Productos.ToList();
          return productos;
      } 

      public class GuardarProductoResponse 
    {
        public GuardarProductoResponse(Producto producto)
        {
            Error = false;
            Producto = producto;
        }
        public GuardarProductoResponse(string mensaje)
        {
            Error = true;
            Mensaje = mensaje;
        }
        public bool Error { get; set; }
        public string Mensaje { get; set; }
        public Producto Producto { get; set; }
    }

     public Producto BuscarxIdentificacion(int identificacion)
        {
            Producto producto = _context.Productos.Find(identificacion);
            return producto;
           
        }
    }
}