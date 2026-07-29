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
        public DbSet<ActivityBooking> ActivityBookings { get; set; }

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
                new CatalogPrice { Id = 16, ItemKey = "wedding_luxury", Category = "Events", DisplayName = "Luxury Wedding", Price = 450000 },

                new CatalogPrice { Id = 17, ItemKey = "bar_cocktail_1", Category = "Bar", DisplayName = "Signature Cocktails", Price = 450, Description = "Handcrafted drinks prepared by expert mixologists." },
                new CatalogPrice { Id = 18, ItemKey = "bar_mocktail_1", Category = "Bar", DisplayName = "Premium Mocktails", Price = 300, Description = "Zero-proof creations bursting with flavor." },
                new CatalogPrice { Id = 19, ItemKey = "bar_wine_1", Category = "Bar", DisplayName = "Wine Selection", Price = 950, Description = "Curated vintages from renowned vineyards." },
                new CatalogPrice { Id = 20, ItemKey = "bar_spirits_1", Category = "Bar", DisplayName = "Spirits", Price = 1200, Description = "Rare whiskeys, cognacs, and fine liqueurs." },
                new CatalogPrice { Id = 21, ItemKey = "bar_cocktail_2", Category = "Bar", DisplayName = "Craft Brews", Price = 380, Description = "Locally sourced artisanal craft beers." },
                new CatalogPrice { Id = 22, ItemKey = "bar_mocktail_2", Category = "Bar", DisplayName = "Tropical Punch", Price = 280, Description = "A refreshing mix of pineapple, mango, and passionfruit." },
                new CatalogPrice { Id = 23, ItemKey = "bar_wine_2", Category = "Bar", DisplayName = "Champagne Select", Price = 1850, Description = "Premium sparkling champagnes imported directly from France." },
                new CatalogPrice { Id = 24, ItemKey = "bar_spirits_2", Category = "Bar", DisplayName = "Rare Vintage Malt", Price = 2400, Description = "A selection of fine and rare single malt whiskeys." }
            );
        }
    }
}
