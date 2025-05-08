using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShipsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ShipsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ships
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ship>>> GetShips()
        {
            return await _context.Ships.ToListAsync();
        }

        // GET: api/ships/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ship>> GetShip(int id)
        {
            var ship = await _context.Ships.FindAsync(id);
            if (ship == null) return NotFound();
            return ship;
        }

        // POST: api/ships
        [HttpPost]
        public async Task<ActionResult<Ship>> CreateShip(Ship ship)
        {
            _context.Ships.Add(ship);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetShip), new { id = ship.Id }, ship);
        }

        // PUT: api/ships/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateShip(int id, Ship ship)
        {
            if (id != ship.Id) return BadRequest();

            _context.Entry(ship).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/ships/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShip(int id)
        {
            var ship = await _context.Ships.FindAsync(id);
            if (ship == null) return NotFound();

            _context.Ships.Remove(ship);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
