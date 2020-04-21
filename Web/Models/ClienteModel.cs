using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Models
{
    public class ClienteInputModel
    {
        
        public string Cedula { get; set; }
        public string Nombre { get; set; }
        public string Telefono { get; set; }
       
    }

    public class ClienteViewModel : ClienteInputModel
    {
        public ClienteViewModel()
        {

        }
        public ClienteViewModel(Cliente cliente)
        {
            Cedula = cliente.Cedula;
            Nombre = cliente.Nombre;
            Telefono = cliente.Telefono;
        }
        
    }
}