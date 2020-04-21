using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entity;
using Logica;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Web.Models;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController: ControllerBase
    {
        private readonly ClienteService _clienteService;
        public IConfiguration Configuration { get; }
        public ClienteController(IConfiguration configuration)
        {
            Configuration = configuration;
            string connectionString = Configuration["ConnectionStrings:DefaultConnection"];
            _clienteService = new ClienteService(connectionString);
        }
        // GET: api/Cliente
        [HttpGet]
        public IEnumerable<ClienteViewModel> Gets()
        {
            var clientes = _clienteService.ConsultarTodos().Select(p=> new ClienteViewModel(p));
            return clientes;
        }

        // POST: api/Cliente
        [HttpPost]
        public ActionResult<ClienteViewModel> Post(ClienteInputModel clienteInput)
        {
            Cliente cliente = MapearCliente(clienteInput);
            var response = _clienteService.Guardar(cliente);
            if (response.Error) 
            {
                return BadRequest(response.Mensaje);
            }
            return Ok(response.Cliente);
        }

        private Cliente MapearCliente(ClienteInputModel clienteInput)
        {
            var cliente = new Cliente
            {
                Cedula = clienteInput.Cedula,
                Nombre = clienteInput.Nombre,
                Telefono = clienteInput.Telefono,
                
            };
            return cliente;
        
    }
    }
}