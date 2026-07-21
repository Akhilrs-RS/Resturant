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
        public DbSet<ContactInquiry> ContactInquiries { get; set; }
        public DbSet<CatalogPrice> CatalogPrices { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<CatalogPrice>().HasData(
                new CatalogPrice { Id = 1, ItemKey = "suite_deluxe", Category = "Suites", DisplayName = "Deluxe Room", Price = 250 },
                new CatalogPrice { Id = 2, ItemKey = "suite_ocean", Category = "Suites", DisplayName = "Ocean Pool Villa", Price = 480 },
                new CatalogPrice { Id = 3, ItemKey = "suite_honeymoon", Category = "Suites", DisplayName = "Honeymoon Suite", Price = 620 },
                new CatalogPrice { Id = 4, ItemKey = "suite_presidential", Category = "Suites", DisplayName = "Presidential Villa", Price = 1250 },

                new CatalogPrice { Id = 5, ItemKey = "dining_pizza", Category = "Dining", DisplayName = "Cherish Pizza Catch", Price = 34 },
                new CatalogPrice { Id = 6, ItemKey = "dining_truffle", Category = "Dining", DisplayName = "Fresh Truffle Entree", Price = 48 },
                new CatalogPrice { Id = 7, ItemKey = "dining_mousse", Category = "Dining", DisplayName = "Coconut Mousse on Pastry", Price = 24 },
                new CatalogPrice { Id = 8, ItemKey = "dining_tea", Category = "Dining", DisplayName = "Spiced Fruit Tea Cup", Price = 12 },

                new CatalogPrice { Id = 9, ItemKey = "pool_hour", Category = "Pool", DisplayName = "Hour Pass", Price = 240 },
                new CatalogPrice { Id = 10, ItemKey = "pool_day", Category = "Pool", DisplayName = "Day Pass", Price = 480 },
                new CatalogPrice { Id = 11, ItemKey = "pool_cabana", Category = "Pool", DisplayName = "Cabana Reserve", Price = 720 },
                new CatalogPrice { Id = 12, ItemKey = "pool_sunset", Category = "Pool", DisplayName = "Sunset Pool Party", Price = 960 },

                new CatalogPrice { Id = 13, ItemKey = "wedding_traditional", Category = "Events", DisplayName = "Traditional Wedding", Price = 240000 },
                new CatalogPrice { Id = 14, ItemKey = "wedding_beachfront", Category = "Events", DisplayName = "Beachfront Wedding", Price = 320000 },
                new CatalogPrice { Id = 15, ItemKey = "wedding_rainforest", Category = "Events", DisplayName = "Rainforest Wedding", Price = 280000 },
                new CatalogPrice { Id = 16, ItemKey = "wedding_luxury", Category = "Events", DisplayName = "Luxury Wedding", Price = 450000 }
            );
        }
    }
}
