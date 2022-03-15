using System.ComponentModel.DataAnnotations;

namespace LanchonetX.Model
{
    public class Lanche
    {
        [Key]
        public int Id { get; set; }
        public string Nome { get; set; }
        public Ingrediente[] Ingredientes { get; set; }
        public int Valor { get; set; }
    }
}
