using System.ComponentModel.DataAnnotations;

namespace LanchonetX.Model
{
    public class Ingrediente
    {
        [Key]
        public int Id { get; set; }
        public string Nome { get; set; }
        public int Valor { get; set; }
    }
}
