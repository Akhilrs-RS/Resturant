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
    public class CatalogController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CatalogController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("prices")]
        public async Task<ActionResult<IEnumerable<CatalogPrice>>> GetPrices()
        {
            return await _context.CatalogPrices.ToListAsync();
        }

        [HttpPut("prices/{itemKey}")]
        public async Task<IActionResult> UpdatePrice(string itemKey, [FromBody] CatalogPrice updateData)
        {
            if (updateData == null) return BadRequest("Invalid update data");

            var priceRecord = await _context.CatalogPrices.FirstOrDefaultAsync(p => p.ItemKey == itemKey);
            if (priceRecord == null) return NotFound($"Price item with key '{itemKey}' not found");

            priceRecord.Price = updateData.Price;
            if (!string.IsNullOrEmpty(updateData.DisplayName))
            {
                priceRecord.DisplayName = updateData.DisplayName;
            }
            if (!string.IsNullOrEmpty(updateData.Description))
            {
                priceRecord.Description = updateData.Description;
            }

            await _context.SaveChangesAsync();
            return Ok(priceRecord);
        }
    }
}
