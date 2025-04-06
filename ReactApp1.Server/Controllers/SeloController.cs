// Controllers/SeloController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models;

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
}
