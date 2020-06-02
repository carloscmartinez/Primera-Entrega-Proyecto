using System.Net;
using Datos;
using Entity;
using Logica;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Web.Config;
using Web.Models;
using Web.Services;

namespace Web.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        VentaContext _context;
        UserService _userService;
        JwtService _jwtService;
        public LoginController(VentaContext context, IOptions<AppSetting> appSettings)
        {
            _context = context;
            var admin = _context.Users.Find("admin");
            if (admin == null) 
            {
                _context.Users.Add(new User() 
                { 
                    Usuario="admin", 
                    Password="admin", 
                    Email="admin@gmail.com", 
                    Estado="AC", 
                    Nombre="Adminitrador", 
                    Apellido="", 
                    Telefono="31800000000"}
                );
                var registrosGuardados=_context.SaveChanges();
            }
            _userService = new UserService(context);
            _jwtService = new JwtService(appSettings);
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login(LoginInputModel model)
        {
            var user = _userService.Validate(model.Usuario, model.Password);
            if (user == null) return BadRequest("Username or password is incorrect");
            var response= _jwtService.GenerateToken(user);
            return Ok(response);
        }
    }
}