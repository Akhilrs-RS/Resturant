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
    public class ReservationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReservationsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("tables")]
        public async Task<IActionResult> CreateTableReservation([FromBody] TableReservation reservation)
        {
            if (reservation == null) return BadRequest("Invalid reservation data");

            _context.TableReservations.Add(reservation);
            await _context.SaveChangesAsync();
            return Ok(reservation);
        }

        [HttpGet("tables")]
        public async Task<ActionResult<IEnumerable<TableReservation>>> GetTableReservations()
        {
            return await _context.TableReservations.ToListAsync();
        }

        [HttpPost("pools")]
        public async Task<IActionResult> CreatePoolBooking([FromBody] PoolBooking booking)
        {
            if (booking == null) return BadRequest("Invalid pool booking data");

            _context.PoolBookings.Add(booking);
            await _context.SaveChangesAsync();
            return Ok(booking);
        }

        [HttpGet("pools")]
        public async Task<ActionResult<IEnumerable<PoolBooking>>> GetPoolBookings()
        {
            return await _context.PoolBookings.ToListAsync();
        }

        [HttpPost("lounges")]
        public async Task<IActionResult> CreateLoungeReservation([FromBody] LoungeReservation reservation)
        {
            if (reservation == null) return BadRequest("Invalid lounge reservation data");

            _context.LoungeReservations.Add(reservation);
            await _context.SaveChangesAsync();
            return Ok(reservation);
        }

        [HttpGet("lounges")]
        public async Task<ActionResult<IEnumerable<LoungeReservation>>> GetLoungeReservations()
        {
            return await _context.LoungeReservations.ToListAsync();
        }
    }
}
