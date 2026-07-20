using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<SuiteBooking> SuiteBookings { get; set; }
        public DbSet<TableReservation> TableReservations { get; set; }
        public DbSet<PoolBooking> PoolBookings { get; set; }
        public DbSet<LoungeReservation> LoungeReservations { get; set; }
        public DbSet<EventInquiry> EventInquiries { get; set; }
    }
}
