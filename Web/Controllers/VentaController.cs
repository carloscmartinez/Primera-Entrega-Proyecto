using System.Net.Http.Headers;
using System.Reflection;
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
    public class VentaController: ControllerBase
    {
        private readonly VentaService _ventaService;
        private readonly IHubContext<SignalHub> _hubContext;
        public VentaController(VentaContext context, IHubContext<SignalHub> hubContext)
        {
            _ventaService = new VentaService(context);
            _hubContext = hubContext;

        }
        //[Authorize(Roles="Administrador,Vendedor")]
        // GET: api/Venta
        [HttpGet]
        public IEnumerable<VentaViewModel> Gets()
        {
            var ventas = _ventaService.ConsultarTodos().Select(p=> new VentaViewModel(p));
            return ventas;
        }

       // [Authorize(Roles="Administrador,Vendedor")]
        // POST: api/Venta
        [HttpPost]
        public ActionResult<VentaViewModel> Post(VentaInputModel ventaInput)
        {
            /* var lista= new List<DetalleVenta>();
            foreach (var item in ventaInput.Detalles)
              {    
                   var detalleVenta= new DetalleVenta();
                   detalleVenta.ProductoId=item.ProductoId;
                   detalleVenta.Cantidad=item.Cantidad;
                   detalleVenta.Precio=item.Precio;
                   detalleVenta.TotalVenta=item.TotalVenta;
                   //ventaNueva.Productos.Add(detalleVenta);
                   lista.Add(detalleVenta);
             } */
           // ventaInput.Detalles=lista;
            Venta venta = MapearVenta(ventaInput);
            var response = _ventaService.Guardar(venta); 
            //var response = _ventaService.Guardar(ventaInput);
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
            //var ventaViewModel = ConsultarUltimaVenta(venta.ClienteId)
            
            return Ok(response.Venta);
        }

        private Venta MapearVenta(VentaInputModel ventaInput)
        {
            //var d= new List<DetalleVenta>();
            var venta = new Venta
            {
                //VentaId = ventaInput.VentaId,
                Fecha = ventaInput.Fecha,
                // NumeroPaquetes = ventaInput.NumeroPaquetes,
                // ValorPaquete = ventaInput.ValorPaquete,
                // TotalVenta = ventaInput.TotalVenta,
                ClienteId = ventaInput.ClienteId,
                Estado = ventaInput.Estado,
                Total = ventaInput.Total,
                //Detalles = ventaInput.Detalles,
                
                /* foreach (var item in ventaInput.Detalles)
              {    
                   var detalleVenta= new DetalleVenta();
                   detalleVenta.Cantidad=item.Cantidad;
                   detalleVenta.Precio=item.Precio;
                   detalleVenta.ProductoId=productoVendido.ProductoId;
                   detalleVenta.CalcularVenta() ;
                   //ventaNueva.Productos.Add(detalleVenta);
                   d.Add(detalleVenta);
             },
             Detalles = d, */
                
            };
            foreach (var item in ventaInput.Detalles)
            {    
                   var detalleVenta= new DetalleVenta();
                   detalleVenta.ProductoId=item.ProductoId;
                   detalleVenta.Cantidad=item.Cantidad;
                   detalleVenta.Precio=item.Precio;                  
                   detalleVenta.CalcularVenta() ;
                   venta.Detalles.Add(detalleVenta);
             }
            //public List<DetalleVenta> LDetalles { get; set; } = new List<DetalleVenta>()
            return venta;
        
    }
        
    }
}
