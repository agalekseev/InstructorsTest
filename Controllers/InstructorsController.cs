using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using angu.Models;

namespace angu.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstructorsController : ControllerBase
    {
        private readonly AngularInstructorsContext _context;

        public InstructorsController(AngularInstructorsContext context)
        {
            _context = context;
        }

        // GET: api/Instructors
        [HttpGet]
        public IEnumerable<Instructors> GetInstructors()
        {
            return _context.Instructors;
        }

        // GET: api/Instructors/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInstructors([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var instructors = await _context.Instructors.FindAsync(id);

            if (instructors == null)
            {
                return NotFound();
            }

            return Ok(instructors);
        }

        // PUT: api/Instructors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInstructors([FromRoute] int id, [FromBody] Instructors instructors)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != instructors.Id)
            {
                return BadRequest();
            }

            _context.Entry(instructors).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InstructorsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(instructors);
        }

        // POST: api/Instructors
        [HttpPost]
        public async Task<IActionResult> PostInstructors([FromBody] Instructors instructors)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Instructors.Add(instructors);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (InstructorsExists(instructors.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetInstructors", new { id = instructors.Id }, instructors);
        }

        // DELETE: api/Instructors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInstructors([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var instructors = await _context.Instructors.FindAsync(id);
            if (instructors == null)
            {
                return NotFound();
            }

            _context.Instructors.Remove(instructors);
            await _context.SaveChangesAsync();

            return Ok(instructors);
        }

        private bool InstructorsExists(int id)
        {
            return _context.Instructors.Any(e => e.Id == id);
        }
    }
}