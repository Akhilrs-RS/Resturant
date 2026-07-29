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

                new CatalogPrice { Id = 17, ItemKey = "bar_cocktail_1", Category = "Bar", DisplayName = "Golden Citrus Old Fashioned", Price = 850, Description = "Classic whiskey mixed with orange peel, aromatic bitters, and a touch of magic." },
                new CatalogPrice { Id = 18, ItemKey = "bar_cocktail_2", Category = "Bar", DisplayName = "Tropical Sunset Martini", Price = 750, Description = "Vodka, pineapple, passion fruit, and lime with a golden sunset finish." },
                new CatalogPrice { Id = 19, ItemKey = "bar_cocktail_3", Category = "Bar", DisplayName = "Ocean Breeze Mojito", Price = 700, Description = "White rum, dark lime, and sparkling soda with coastal freshness." },
                new CatalogPrice { Id = 20, ItemKey = "bar_cocktail_4", Category = "Bar", DisplayName = "Spiced Island Mule", Price = 780, Description = "Rum, ginger beer, lime, and spices served ice cold classic." },
                new CatalogPrice { Id = 21, ItemKey = "bar_cocktail_5", Category = "Bar", DisplayName = "Velvet Raspberry Sour", Price = 820, Description = "Gin, fresh raspberries, lemon juice, and a velvety smooth foam." },
                new CatalogPrice { Id = 22, ItemKey = "bar_cocktail_6", Category = "Bar", DisplayName = "Midnight Espresso", Price = 900, Description = "Premium vodka, fresh espresso, and coffee liqueur for a bold night." },
                new CatalogPrice { Id = 23, ItemKey = "bar_cocktail_7", Category = "Bar", DisplayName = "Smoked Maple Bourbon", Price = 950, Description = "Bourbon infused with applewood smoke and pure maple syrup." },
                new CatalogPrice { Id = 24, ItemKey = "bar_cocktail_8", Category = "Bar", DisplayName = "Sapphire Gin Fizz", Price = 680, Description = "Botanical gin, fresh lemon, and a splash of sparkling water." },
                new CatalogPrice { Id = 25, ItemKey = "bar_mocktail_1", Category = "Bar", DisplayName = "Virgin Mojito", Price = 350, Description = "Mint, lime, and soda without the alcohol." },
                new CatalogPrice { Id = 26, ItemKey = "bar_mocktail_2", Category = "Bar", DisplayName = "Sunset Punch", Price = 400, Description = "Tropical blend of pineapple, orange, and grenadine." },
                new CatalogPrice { Id = 27, ItemKey = "bar_wine_1", Category = "Bar", DisplayName = "House Red Wine", Price = 1200, Description = "A robust red wine from our private cellar." },
                new CatalogPrice { Id = 28, ItemKey = "bar_spirits_1", Category = "Bar", DisplayName = "Aged Single Malt", Price = 1800, Description = "12-year aged scotch whiskey served neat." }
            );
        }
    }
}
