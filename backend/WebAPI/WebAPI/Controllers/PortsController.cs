using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PortsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Ports
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Port>>> GetPorts()
        {
            return await _context.Ports.ToListAsync();
        }

        // GET: api/Ports/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Port>> GetPort(int id)
        {
            var Port = await _context.Ports.FindAsync(id);
            if (Port == null) return NotFound();
            return Port;
        }

        // POST: api/Ports
        [HttpPost]
        public async Task<ActionResult<Port>> CreatePort(Port Port)
        {
            _context.Ports.Add(Port);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPort), new { id = Port.Id }, Port);
        }

        // PUT: api/Ports/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePort(int id, Port Port)
        {
            if (id != Port.Id) return BadRequest();

            _context.Entry(Port).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Ports/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePort(int id)
        {
            var Port = await _context.Ports.FindAsync(id);
            if (Port == null) return NotFound();

            _context.Ports.Remove(Port);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
