using System.Net.Http;
using Datos;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Logica
{
    public class UserService
    {
        private readonly VentaContext _context;
        public UserService(VentaContext context)=> _context = context;
        public User Validate(string usuario, string password) 
        {
            return _context.Users.FirstOrDefault(t => t.Usuario == usuario && t.Password == password && t.Estado == "AC");
        }

        public GuardarUserResponse Guardar(User user)
      {
          try
          {
              //var userAux = _context.Users.Find(user.Usuario);
              var userAux = _context.Users.FirstOrDefault(x => x.Usuario == user.Usuario);
              if (userAux != null)
              {
                  return new GuardarUserResponse($"Error de la aplicacion: El Usuario ya se encuentra registrado!");
              }
              _context.Users.Add(user);
              _context.SaveChanges();
              return new GuardarUserResponse(user);
          }
          catch (Exception e)
          {
              return new GuardarUserResponse($"Error de la aplicacion: {e.Message}");
          }
      }

      public List<User> ConsultarTodos()
      {
          List<User> users = _context.Users.ToList();
          return users;
      } 

      public class GuardarUserResponse 
    {
        public GuardarUserResponse(User user)
        {
            Error = false;
            User = user;
        }
        public GuardarUserResponse(string mensaje)
        {
            Error = true;
            Mensaje = mensaje;
        }
        public bool Error { get; set; }
        public string Mensaje { get; set; }
        public User User { get; set; }
    }

    public User BuscarxIdentificacion(int id)
        {
            User user = _context.Users.Find(id);
            return user;
           
        }

    public User Actualizar(User item)
      {
          _context.Entry(_context.Users.FirstOrDefault(x => x.UserId == item.UserId)).CurrentValues.SetValues(item);
         _context.SaveChanges();

            return item;
      
      }


    }
}