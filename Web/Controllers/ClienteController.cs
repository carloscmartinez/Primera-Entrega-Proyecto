using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Datos;
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
        // public IConfiguration Configuration { get; }
        public ClienteController(VentaContext context)
        {
            _clienteService = new ClienteService(context);
            /* Configuration = configuration;
            string connectionString = Configuration["ConnectionStrings:DefaultConnection"];
            _clienteService = new ClienteService(connectionString); */
        }
        // GET: api/Cliente
        [HttpGet]
        public IEnumerable<ClienteViewModel> Gets()
        {
            var clientes = _clienteService.ConsultarTodos().Select(p=> new ClienteViewModel(p));
            return clientes;
        }

        // GET: api/Persona/5
        [HttpGet("{identificacion}")]
        public ActionResult<ClienteViewModel> Get(long identificacion)
        {
            var cliente = _clienteService.BuscarxIdentificacion(identificacion);
            if (cliente == null) return NotFound();
            var clienteViewModel = new ClienteViewModel(cliente);
            return clienteViewModel;
        }

        //GET: api/Cliente/5
        // [HttpGet("{id}")]
        // public ActionResult<ClienteViewModel> GetCliente(long id)
        // {
        //     var cliente = await _context.Clientes.FindAsync(id)
        //     if (cliente == null)
        //     {
        //         return NotFound();
        //     }
        //     return cliente;
        // }

        // POST: api/Cliente
        [HttpPost]
        public ActionResult<ClienteViewModel> Post(ClienteInputModel clienteInput)
        {
            Cliente cliente = MapearCliente(clienteInput);
            var response = _clienteService.Guardar(cliente);
            if (response.Error) 
            {  
                //------------------------------------------------------------------------------------
                //Retornar los mensajes de validación adicionales en el mismo fomato que el ModalState
                ModelState.AddModelError("Guardar Cliente", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
                //------------------------------------------------------------------------------------
                // return BadRequest(response.Mensaje);
            }
            return Ok(response.Cliente);
        }

        private Cliente MapearCliente(ClienteInputModel clienteInput)
        {
            var cliente = new Cliente
            {
                ClienteId = clienteInput.ClienteId,
                Nombre = clienteInput.Nombre,
                Apellido = clienteInput.Apellido,
                Telefono = clienteInput.Telefono,
                
            };
            return cliente;
        
    }
    // PUT: api/Persona/5
        [HttpPut("{identificacion}")]
        public ActionResult<string> Put(long identificacion, ClienteInputModel clienteInput)
        {
            if (identificacion != clienteInput.ClienteId)
            {
                return BadRequest();
            }
            Cliente cliente = MapearCliente(clienteInput);
            var response = _clienteService.Actualizar(cliente);
            return Ok(response);
           /*  if (response.Error) 
            {  
                //------------------------------------------------------------------------------------
                //Retornar los mensajes de validación adicionales en el mismo fomato que el ModalState
                ModelState.AddModelError("Actualizae Cliente", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
                //------------------------------------------------------------------------------------
                // return BadRequest(response.Mensaje);
            }
            return Ok(response.Cliente);
            //------------------------------------- */
             

            // _context.Entry(clienteInput).State = EntityState.Modified;

           
        }
    }

    
}