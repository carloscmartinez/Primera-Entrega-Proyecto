using Datos;
using Entity;
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

    }
}