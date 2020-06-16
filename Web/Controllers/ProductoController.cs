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
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController: ControllerBase
    {
        private readonly ProductoService _productoService;

        public ProductoController(VentaContext context)
        {
            _productoService = new ProductoService(context);
        }

        //[Authorize(Roles="Administrador,Vendedor")]
        // GET: api/Cliente
        [HttpGet]
        public IEnumerable<ProductoViewModel> Gets()
        {
            var productos = _productoService.ConsultarTodos().Select(p=> new ProductoViewModel(p));
            return productos;
        }

        //[Authorize(Roles="Administrador,Vendedor")]
        // GET: api/Persona/5
        [HttpGet("{id}")]
        public ActionResult<ProductoViewModel> Get(int id)
        {
            var producto = _productoService.BuscarxIdentificacion(id);
            if (producto == null) 
            {
                var productoViewModel = new ProductoViewModel();
                productoViewModel=null;
                return productoViewModel;
            }else{
                var productoViewModel = new ProductoViewModel(producto);
                return productoViewModel;
            }
            
        }

        //[Authorize(Roles="Administrador,Vendedor")]
        [HttpPost]
        public ActionResult<ProductoViewModel> Post(ProductoInputModel productoInput)
        {
            Producto producto = MapearProducto(productoInput);
            var response = _productoService.Guardar(producto);
            if (response.Error) 
            {  
                //------------------------------------------------------------------------------------
                //Retornar los mensajes de validación adicionales en el mismo fomato que el ModalState
                ModelState.AddModelError("Guardar User", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
                //------------------------------------------------------------------------------------
                // return BadRequest(response.Mensaje);
            }
            return Ok(response.Producto);
        }

        private Producto MapearProducto(ProductoInputModel productoInput)
        {
            var producto = new Producto
            {            
                Nombre = productoInput.Nombre,
                Precio = productoInput.Precio,               
            };
            return producto;
        
    }
    }
}