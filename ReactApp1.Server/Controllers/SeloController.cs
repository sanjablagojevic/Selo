// Controllers/SeloController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models;
using ReactApp1.Server.Models.ReactApp1.Server.Models;

[Route("api/[controller]")]
[ApiController]
public class SeloController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SeloController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Selo
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Selo>>> GetSela()
    {
        return await _context.Sela.ToListAsync();
    }

    // GET: api/Selo/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Selo>> GetSelo(int id)
    {
        var selo = await _context.Sela.FindAsync(id);

        if (selo == null)
        {
            return NotFound();
        }

        return selo;
    }

    // POST: api/Selo
    [HttpPost]
    public async Task<ActionResult<Selo>> PostSelo(Selo selo)
    {
        _context.Sela.Add(selo);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSelo), new { id = selo.Id }, selo);
    }

    // PUT: api/Selo/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutSelo(int id, Selo selo)
    {
        if (id != selo.Id)
        {
            return BadRequest();
        }

        _context.Entry(selo).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/Selo/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSelo(int id)
    {
        var selo = await _context.Sela.FindAsync(id);
        if (selo == null)
        {
            return NotFound();
        }

        _context.Sela.Remove(selo);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // GET: api/Selo/countries
    [HttpGet("countries")]
    public async Task<ActionResult<IEnumerable<Countries>>> GetCountries()
    {
        return await _context.Countries.ToListAsync();
    }

    // GET: api/Selo/countries
    [HttpGet("cities")]
    public async Task<ActionResult<IEnumerable<Cities>>> GetCities()
    {
        return await _context.Cities.ToListAsync();
    }

    // GET: api/Selo/countries/{id}/cities
    [HttpGet("countries/{id}/cities")]
    public async Task<ActionResult<IEnumerable<Cities>>> GetCitiesByCountry(int id)
    {
        var country = await _context.Countries.Include(c => c.Cities)
                                               .FirstOrDefaultAsync(c => c.Id == id);

        if (country == null)
        {
            return NotFound();
        }

        return country.Cities.ToList();
    }

    [HttpGet("coordinates")]
    public async Task<ActionResult<IEnumerable<SeloMapVM>>> GetSeloCoordinates()
    {
        return await _context.Sela
            .Select(s => new SeloMapVM
            {
                Naziv = s.Naziv,
                Latitude = s.Lat,
                Longitude = s.Lng
            })
            .ToListAsync();
    }
}
