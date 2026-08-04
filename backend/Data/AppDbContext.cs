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
                new CatalogPrice { Id = 28, ItemKey = "bar_spirits_1", Category = "Bar", DisplayName = "Aged Single Malt", Price = 1800, Description = "12-year aged scotch whiskey served neat." },

                // Dining Menu: Chef Specials
                new CatalogPrice { Id = 29, ItemKey = "menu_chef_1", Category = "Menu_Chef", DisplayName = "Grilled Coastal Seafood Platter", Price = 1450, Description = "Fresh Catch the day, lemon butter sauce, grilled vegetables.", DietaryType = "Non-Veg" },
                new CatalogPrice { Id = 30, ItemKey = "menu_chef_2", Category = "Menu_Chef", DisplayName = "Special Prawn Curry", Price = 950, Description = "Traditional coconut-based prawn curry served with steamed rice.", DietaryType = "Non-Veg" },
                new CatalogPrice { Id = 31, ItemKey = "menu_chef_3", Category = "Menu_Chef", DisplayName = "Herb Roasted Chicken", Price = 850, Description = "Oven roasted chicken with herbs, mashed potato, and seasonal vegetables.", DietaryType = "Non-Veg" },
                new CatalogPrice { Id = 32, ItemKey = "menu_chef_4", Category = "Menu_Chef", DisplayName = "Vegetarian Royal Thali", Price = 750, Description = "A curated vegetarian thali with regional flavors and desserts.", DietaryType = "Veg" },

                // Dining Menu: Indian Cuisine
                new CatalogPrice { Id = 33, ItemKey = "menu_indian_1", Category = "Menu_Indian", DisplayName = "Meals", Price = 480, Description = "Traditional rice meal with curries, vegetables, pickle, papad, and dessert.", DietaryType = "Veg" },
                new CatalogPrice { Id = 34, ItemKey = "menu_indian_2", Category = "Menu_Indian", DisplayName = "Chicken Biriyani", Price = 620, Description = "Aromatic rice cooked with chicken, spices, fried onions, and raita.", DietaryType = "Non-Veg" },
                new CatalogPrice { Id = 35, ItemKey = "menu_indian_3", Category = "Menu_Indian", DisplayName = "Paneer Butter Masala", Price = 560, Description = "Soft paneer cooked in rich creamy tomato gravy.", DietaryType = "Veg" },
                new CatalogPrice { Id = 36, ItemKey = "menu_indian_4", Category = "Menu_Indian", DisplayName = "Butter Chicken with Naan", Price = 780, Description = "Creamy butter chicken served with soft naan.", DietaryType = "Veg" },
                new CatalogPrice { Id = 37, ItemKey = "menu_indian_5", Category = "Menu_Indian", DisplayName = "Malabar Parotta with Chicken Curry", Price = 520, Description = "Layered Kerala parotta served with spicy chicken curry.", DietaryType = "Non-Veg" },
                new CatalogPrice { Id = 38, ItemKey = "menu_indian_6", Category = "Menu_Indian", DisplayName = "Malabar Parotta with Chicken Curry", Price = 520, Description = "Layered Kerala parotta served with spicy chicken curry.", DietaryType = "Non-Veg" },

                // Dining Menu: Chinese Cuisine
                new CatalogPrice { Id = 39, ItemKey = "menu_chinese_1", Category = "Menu_Chinese", DisplayName = "Chicken Fried Rice", Price = 520, Description = "Wok tossed rice with chicken, vegetables, egg, and Chinese sauces.", DietaryType = "Non-Veg" },
                new CatalogPrice { Id = 40, ItemKey = "menu_chinese_2", Category = "Menu_Chinese", DisplayName = "Veg Hakka Noodles", Price = 480, Description = "Stir fried noodles with fresh vegetables and soy garlic flavor.", DietaryType = "Veg" },
                new CatalogPrice { Id = 41, ItemKey = "menu_chinese_3", Category = "Menu_Chinese", DisplayName = "Chicken Manchurian", Price = 580, Description = "Crispy chicken tossed in spicy Manchurian sauce.", DietaryType = "Non-Veg" },
                new CatalogPrice { Id = 42, ItemKey = "menu_chinese_4", Category = "Menu_Chinese", DisplayName = "Chilli Paneer", Price = 480, Description = "Paneer cubes tossed with bell peppers, onion, and chilli sauce.", DietaryType = "Veg" },
                new CatalogPrice { Id = 43, ItemKey = "menu_chinese_5", Category = "Menu_Chinese", DisplayName = "Schezwan Fried Rice", Price = 480, Description = "Spicy Schezwan rice with vegetables and bold flavors.", DietaryType = "Veg" },
                new CatalogPrice { Id = 44, ItemKey = "menu_chinese_6", Category = "Menu_Chinese", DisplayName = "Honey Chilli Potato", Price = 420, Description = "Crispy potato tossed in honey chilli glaze.", DietaryType = "Veg" },

                // Dining Menu: Arabic Cuisine
                new CatalogPrice { Id = 45, ItemKey = "menu_arabic_1", Category = "Menu_Arabic", DisplayName = "Chicken Mandi", Price = 850, Description = "Slow-cooked Arabian rice with tender spiced chicken.", DietaryType = "Non-Veg" },
                new CatalogPrice { Id = 46, ItemKey = "menu_arabic_2", Category = "Menu_Arabic", DisplayName = "Al Faham Chicken", Price = 750, Description = "Charcoal grilled chicken served with garlic sauce and salad.", DietaryType = "Non-Veg" },
                new CatalogPrice { Id = 47, ItemKey = "menu_arabic_3", Category = "Menu_Arabic", DisplayName = "Shawarma Platter", Price = 620, Description = "Roasted chicken spiced with bell peppers, onion, and mint sauce.", DietaryType = "Non-Veg" },
                new CatalogPrice { Id = 48, ItemKey = "menu_arabic_4", Category = "Menu_Arabic", DisplayName = "Chicken Mandi", Price = 850, Description = "Slow-cooked Arabian rice with tender spiced chicken.", DietaryType = "Non-Veg" },
                new CatalogPrice { Id = 49, ItemKey = "menu_arabic_5", Category = "Menu_Arabic", DisplayName = "Falafel Plate", Price = 450, Description = "Crispy falafel served with tahini dip, salad, and pita.", DietaryType = "Veg" },
                new CatalogPrice { Id = 50, ItemKey = "menu_arabic_6", Category = "Menu_Arabic", DisplayName = "Falafel Plate", Price = 450, Description = "Crispy falafel served with tahini dip, salad, and pita.", DietaryType = "Veg" },
                
                // Home Page Dynamic Images
                new CatalogPrice { Id = 51, ItemKey = "home_dining", Category = "Home_Images", DisplayName = "Home Dining Section Image", Price = 0, Description = "Image for the Dining section on the Home page." },
                new CatalogPrice { Id = 52, ItemKey = "home_pool", Category = "Home_Images", DisplayName = "Home Pool Section Image", Price = 0, Description = "Image for the Pool section on the Home page." }
            );
        }
    }
}
