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

namespace Web.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class VentaController: ControllerBase
    {
        private readonly VentaService _ventaService;
        public VentaController(VentaContext context)
        {
            _ventaService = new VentaService(context);

        }
        [Authorize(Roles="Administrador,Vendedor")]
        // GET: api/Venta
        [HttpGet]
        public IEnumerable<VentaViewModel> Gets()
        {
            var ventas = _ventaService.ConsultarTodos().Select(p=> new VentaViewModel(p));
            return ventas;
        }

        [Authorize(Roles="Administrador,Vendedor")]
        // POST: api/Venta
        [HttpPost]
        public ActionResult<VentaViewModel> Post(VentaInputModel ventaInput)
        {
            Venta venta = MapearVenta(ventaInput);
            var response = _ventaService.Guardar(venta);
            if (response.Error) 
            {  
                //------------------------------------------------------------------------------------
                //Retornar los mensajes de validación adicionales en el mismo fomato que el ModalState
                ModelState.AddModelError("Guardar Venta", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
                //------------------------------------------------------------------------------------
                // return BadRequest(response.Mensaje);
            }
            return Ok(response.Venta);
        }

        private Venta MapearVenta(VentaInputModel ventaInput)
        {
            var venta = new Venta
            {
                VentaId = ventaInput.VentaId,
                Fecha = ventaInput.Fecha,
                NumeroPaquetes = ventaInput.NumeroPaquetes,
                ValorPaquete = ventaInput.ValorPaquete,
                TotalVenta = ventaInput.TotalVenta,
                ClienteId = ventaInput.ClienteId,
                
            };
            return venta;
        
    }
        
    }
}
