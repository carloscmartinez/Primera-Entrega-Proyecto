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
    public class UserController: ControllerBase
    {
        private readonly UserService _userService;

        public UserController(VentaContext context)
        {
            _userService = new UserService(context);
        }

        [Authorize(Roles="Administrador")]
        // GET: api/Cliente
        [HttpGet]
        public IEnumerable<UserViewModel> Gets()
        {
            var users = _userService.ConsultarTodos().Select(p=> new UserViewModel(p));
            return users;
        }

        [Authorize(Roles="Administrador")]
        // GET: api/Persona/5
        [HttpGet("{id}")]
        public ActionResult<UserViewModel> Get(int id)
        {
            var user = _userService.BuscarxIdentificacion(id);
            if (user == null) 
            {
                var userViewModel = new UserViewModel();
                userViewModel=null;
                return userViewModel;
            }else{
                var userViewModel = new UserViewModel(user);
                return userViewModel;
            }
            
        }

        [Authorize(Roles="Administrador")]
        [HttpPost]
        public ActionResult<UserViewModel> Post(UserInputModel userInput)
        {
            User user = MapearUser(userInput);
            var response = _userService.Guardar(user);
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
            return Ok(response.User);
        }

        private User MapearUser(UserInputModel userInput)
        {
            var user = new User
            {
                UserId = userInput.UserId,
                Usuario = userInput.Usuario,
                Password = userInput.Password,
                Estado = userInput.Estado,
                Nombre = userInput.Nombre,
                Apellido = userInput.Apellido,
                Role = userInput.Role,
                Telefono = userInput.Telefono,
                
            };
            return user;
        
    }

    //[Authorize(Role="Administrador")]
    // PUT: api/Persona/5
        [HttpPut("{id}")]
        public ActionResult<string> Put(int id, UserInputModel userInput)
        {
            if (id != userInput.UserId)
            {
                return BadRequest();
            }
            User user = MapearUser(userInput);
            var response = _userService.Actualizar(user);
            return Ok(response);  
        }
    }
}