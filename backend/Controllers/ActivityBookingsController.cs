using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/bookings/activities")]
    public class ActivityBookingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ActivityBookingsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivityBooking([FromBody] ActivityBooking booking)
        {
            if (booking == null) return BadRequest("Invalid booking data");

            _context.ActivityBookings.Add(booking);
            await _context.SaveChangesAsync();
            return Ok(booking);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivityBooking>>> GetActivityBookings()
        {
            return await _context.ActivityBookings.ToListAsync();
        }
    }
}
