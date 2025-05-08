using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoyagesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VoyagesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Voyages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Voyage>>> GetVoyages()
        {
            return await _context.Voyages.ToListAsync();
        }

        // GET: api/Voyages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Voyage>> GetVoyage(int id)
        {
            var Voyage = await _context.Voyages.FindAsync(id);
            if (Voyage == null) return NotFound();
            return Voyage;
        }

        // POST: api/Voyages
        [HttpPost]
        public async Task<ActionResult<Voyage>> CreateVoyage(Voyage Voyage)
        {
            _context.Voyages.Add(Voyage);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetVoyage), new { id = Voyage.Id }, Voyage);
        }

        // PUT: api/Voyages/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVoyage(int id, Voyage Voyage)
        {
            if (id != Voyage.Id) return BadRequest();

            _context.Entry(Voyage).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Voyages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVoyage(int id)
        {
            var Voyage = await _context.Voyages.FindAsync(id);
            if (Voyage == null) return NotFound();

            _context.Voyages.Remove(Voyage);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
