using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CountriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/countries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Country>>> GetCountries()
        {
            return await _context.Countries.ToListAsync();
        }

        // GET: api/Countries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Country>> GetCountry(int id)
        {
            var Country = await _context.Countries.FindAsync(id);
            if (Country == null) return NotFound();
            return Country;
        }

        // POST: api/Countries
        [HttpPost]
        public async Task<ActionResult<Country>> CreateCountry(Country Country)
        {
            _context.Countries.Add(Country);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCountry), new { id = Country.Id }, Country);
        }

        // PUT: api/Countries/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCountry(int id, Country Country)
        {
            if (id != Country.Id) return BadRequest();

            _context.Entry(Country).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Countries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCountry(int id)
        {
            var Country = await _context.Countries.FindAsync(id);
            if (Country == null) return NotFound();

            _context.Countries.Remove(Country);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
