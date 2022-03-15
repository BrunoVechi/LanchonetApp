using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LanchonetX.Model;

namespace LanchonetX.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredienteController : ControllerBase
    {
        private readonly Context _context;

        public IngredienteController(Context context)
        {
            _context = context;
        }

        // GET: api/Ingrediente
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ingrediente>>> GetIngrediente()
        {
            return await _context.Ingrediente.ToListAsync();
        }

        // GET: api/Ingrediente/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ingrediente>> GetIngrediente(int id)
        {
            var ingrediente = await _context.Ingrediente.FindAsync(id);

            if (ingrediente == null)
            {
                return NotFound();
            }

            return ingrediente;
        }

        // PUT: api/Ingrediente/5        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIngrediente(int id,[FromForm]Ingrediente ingrediente)
        {
            if (id != ingrediente.Id)
            {
                return BadRequest();
            }

            _context.Entry(ingrediente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IngredienteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Ingrediente       
        [HttpPost]
        public async Task<ActionResult<Ingrediente>> PostIngrediente([FromForm] Ingrediente ingrediente)
        {
            _context.Ingrediente.Add(ingrediente);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIngrediente", new { id = ingrediente.Id }, ingrediente);
        }

        // DELETE: api/Ingrediente/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIngrediente(int id)
        {
            var ingrediente = await _context.Ingrediente.FindAsync(id);
            if (ingrediente == null)
            {
                return NotFound();
            }

            _context.Ingrediente.Remove(ingrediente);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IngredienteExists(int id)
        {
            return _context.Ingrediente.Any(e => e.Id == id);
        }
    }
}
