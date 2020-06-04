using Entity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Web.Config;
using Web.Models;

namespace Web.Services
{
    public class JwtService
    {
        private readonly AppSetting _appSettings;
        public JwtService(IOptions<AppSetting> appSettings)=> _appSettings = appSettings.Value;
        public LoginViewModel GenerateToken(User userLogIn)
        {
            // return null if user not found
            if (userLogIn == null) return null;
            var userResponse = new LoginViewModel() { Nombre = userLogIn.Nombre, Apellido = userLogIn.Apellido, Usuario = userLogIn.Usuario, Role = userLogIn.Role};
            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, userLogIn.Usuario),
                    //new Claim(ClaimTypes.Email, userLogIn.Email.ToString()),
                    // new Claim(ClaimTypes.Telefono, userLogIn.Telefono.ToString()),
                    new Claim(ClaimTypes.Role, userLogIn.Role)
                    // new Claim(ClaimTypes.Role, "Vendedor"),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            userResponse.Token = tokenHandler.WriteToken(token);
            return userResponse;
        }
    }
}