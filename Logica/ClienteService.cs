using System.Net.Http;
using Datos;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Logica
{
    
    public class ClienteService
    {
      private readonly VentaContext _context;
      public ClienteService(VentaContext context)
      {
          _context = context;
      } 
      
      public GuardarClienteResponse Guardar(Cliente cliente)
      {
          try
          {
              var clienteAux = _context.Clientes.Find(cliente.ClienteId);
              if (clienteAux != null)
              {
                  return new GuardarClienteResponse($"Error de la aplicacion: El cliente ya se encuentra registrado!");
              }
              _context.Clientes.Add(cliente);
              _context.SaveChanges();
              return new GuardarClienteResponse(cliente);
          }
          catch (Exception e)
          {
              return new GuardarClienteResponse($"Error de la aplicacion: {e.Message}");
          }
      }

      public List<Cliente> ConsultarTodos()
      {
          List<Cliente> clientes = _context.Clientes.ToList();
          return clientes;
      } 

      public class GuardarClienteResponse 
    {
        public GuardarClienteResponse(Cliente cliente)
        {
            Error = false;
            Cliente = cliente;
        }
        public GuardarClienteResponse(string mensaje)
        {
            Error = true;
            Mensaje = mensaje;
        }
        public bool Error { get; set; }
        public string Mensaje { get; set; }
        public Cliente Cliente { get; set; }
    }

    public Cliente BuscarxIdentificacion(long identificacion)
        {
            Cliente cliente = _context.Clientes.Find(identificacion);
            return cliente;
           
        }

    public Cliente Actualizar(Cliente item)
      {
          _context.Entry(_context.Clientes.FirstOrDefault(x => x.ClienteId == item.ClienteId)).CurrentValues.SetValues(item);
         _context.SaveChanges();
        //  _
            // _context.Clientes.Entry(item).State = EntityState.Modified;
            // _context.SaveChanges();
            return item;
        //   try
        //   {
        //       var clienteModificado = _context.Clientes.FirstOrDefault(item => item.ClienteId == cliente.ClienteId);
        //       clienteModificado=cliente;
              
        //       _context.SaveChanges();
        //       return new GuardarClienteResponse(cliente);
        //   }
        //   catch (Exception e)
        //   {
        //       return new GuardarClienteResponse($"Error de la aplicacion: {e.Message}");
        //   }
      }

    }
}