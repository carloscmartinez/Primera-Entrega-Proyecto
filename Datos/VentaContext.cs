using Entity;
using Microsoft.EntityFrameworkCore;

namespace Datos
{
    public class VentaContext: DbContext
    {
        public VentaContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Venta> Ventas { get; set; }
        public DbSet<DetalleVenta> DetalleVentas { get; set; }
        public DbSet<Producto> Productos { get; set; }

    }
}