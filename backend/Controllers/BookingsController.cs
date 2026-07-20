using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BookingsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("suites")]
        public async Task<IActionResult> CreateSuiteBooking([FromBody] SuiteBooking booking)
        {
            if (booking == null) return BadRequest("Invalid booking data");

            _context.SuiteBookings.Add(booking);
            await _context.SaveChangesAsync();
            return Ok(booking);
        }

        [HttpGet("suites")]
        public async Task<ActionResult<IEnumerable<SuiteBooking>>> GetSuiteBookings()
        {
            return await _context.SuiteBookings.ToListAsync();
        }
    }
}
