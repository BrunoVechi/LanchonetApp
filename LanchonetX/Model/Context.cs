using Microsoft.EntityFrameworkCore;

namespace LanchonetX.Model
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        { }
      
        public DbSet<Ingrediente> Ingrediente { get; set; }       
        public DbSet<Lanche> Lanche { get; set; }

    }
}
