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
using Microsoft.AspNetCore.Authorization;
using Web.Services;
using System.Net;
using Web.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace Web.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController: ControllerBase
    {
        private readonly ClienteService _clienteService;
        private readonly IHubContext<SignalHub> _hubContext;
        // public IConfiguration Configuration { get; }
        public ClienteController(VentaContext context, IHubContext<SignalHub> hubContext)
        {
            _clienteService = new ClienteService(context);
            _hubContext = hubContext;
            /* Configuration = configuration;
            string connectionString = Configuration["ConnectionStrings:DefaultConnection"];
            _clienteService = new ClienteService(connectionString); */
        }

        //[Authorize(Roles="Administrador,Vendedor")]
        // GET: api/Cliente
        [HttpGet]
        public IEnumerable<ClienteViewModel> Gets()
        {
            var clientes = _clienteService.ConsultarTodos().Select(p=> new ClienteViewModel(p));
            return clientes;
        }

        //[Authorize(Roles="Administrador,Vendedor")]
        // GET: api/Persona/5
        [HttpGet("{identificacion}")]
        public ActionResult<ClienteViewModel> Get(long identificacion)
        {
            //var clienteViewModel: ClienteViewModel();
            var cliente = _clienteService.BuscarxIdentificacion(identificacion);
            if (cliente == null) 
            {
                var clienteViewModel = new ClienteViewModel();
                clienteViewModel=null;
                return clienteViewModel;
            }else{
                var clienteViewModel = new ClienteViewModel(cliente);
                return clienteViewModel;
            }
            
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

        //[Authorize(Roles="Administrador,Vendedor")]
        // POST: api/Cliente
        [HttpPost]
        public async Task<ActionResult<ClienteViewModel>> PostAsync(ClienteInputModel clienteInput)
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
            var clienteViewModel = new ClienteViewModel(cliente);
            await _hubContext.Clients.All.SendAsync("ClienteRegistrado", clienteViewModel);
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

    //[Authorize(Roles="Administrador,Vendedor")]
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