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
    public class InquiriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public InquiriesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("events")]
        public async Task<IActionResult> CreateEventInquiry([FromBody] EventInquiry inquiry)
        {
            if (inquiry == null) return BadRequest("Invalid inquiry data");

            _context.EventInquiries.Add(inquiry);
            await _context.SaveChangesAsync();
            return Ok(inquiry);
        }

        [HttpGet("events")]
        public async Task<ActionResult<IEnumerable<EventInquiry>>> GetEventInquiries()
        {
            return await _context.EventInquiries.ToListAsync();
        }
    }
}
