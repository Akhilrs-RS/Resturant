using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class SeedDiningMenu : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "CatalogPrices",
                columns: new[] { "Id", "Category", "Description", "DietaryType", "DisplayName", "ImageUrl", "ItemKey", "Price" },
                values: new object[,]
                {
                    { 29, "Menu_Chef", "Fresh Catch the day, lemon butter sauce, grilled vegetables.", "Non-Veg", "Grilled Coastal Seafood Platter", null, "menu_chef_1", 1450m },
                    { 30, "Menu_Chef", "Traditional coconut-based prawn curry served with steamed rice.", "Non-Veg", "Special Prawn Curry", null, "menu_chef_2", 950m },
                    { 31, "Menu_Chef", "Oven roasted chicken with herbs, mashed potato, and seasonal vegetables.", "Non-Veg", "Herb Roasted Chicken", null, "menu_chef_3", 850m },
                    { 32, "Menu_Chef", "A curated vegetarian thali with regional flavors and desserts.", "Veg", "Vegetarian Royal Thali", null, "menu_chef_4", 750m },
                    { 33, "Menu_Indian", "Traditional rice meal with curries, vegetables, pickle, papad, and dessert.", "Veg", "Meals", null, "menu_indian_1", 480m },
                    { 34, "Menu_Indian", "Aromatic rice cooked with chicken, spices, fried onions, and raita.", "Non-Veg", "Chicken Biriyani", null, "menu_indian_2", 620m },
                    { 35, "Menu_Indian", "Soft paneer cooked in rich creamy tomato gravy.", "Veg", "Paneer Butter Masala", null, "menu_indian_3", 560m },
                    { 36, "Menu_Indian", "Creamy butter chicken served with soft naan.", "Veg", "Butter Chicken with Naan", null, "menu_indian_4", 780m },
                    { 37, "Menu_Indian", "Layered Kerala parotta served with spicy chicken curry.", "Non-Veg", "Malabar Parotta with Chicken Curry", null, "menu_indian_5", 520m },
                    { 38, "Menu_Indian", "Layered Kerala parotta served with spicy chicken curry.", "Non-Veg", "Malabar Parotta with Chicken Curry", null, "menu_indian_6", 520m },
                    { 39, "Menu_Chinese", "Wok tossed rice with chicken, vegetables, egg, and Chinese sauces.", "Non-Veg", "Chicken Fried Rice", null, "menu_chinese_1", 520m },
                    { 40, "Menu_Chinese", "Stir fried noodles with fresh vegetables and soy garlic flavor.", "Veg", "Veg Hakka Noodles", null, "menu_chinese_2", 480m },
                    { 41, "Menu_Chinese", "Crispy chicken tossed in spicy Manchurian sauce.", "Non-Veg", "Chicken Manchurian", null, "menu_chinese_3", 580m },
                    { 42, "Menu_Chinese", "Paneer cubes tossed with bell peppers, onion, and chilli sauce.", "Veg", "Chilli Paneer", null, "menu_chinese_4", 480m },
                    { 43, "Menu_Chinese", "Spicy Schezwan rice with vegetables and bold flavors.", "Veg", "Schezwan Fried Rice", null, "menu_chinese_5", 480m },
                    { 44, "Menu_Chinese", "Crispy potato tossed in honey chilli glaze.", "Veg", "Honey Chilli Potato", null, "menu_chinese_6", 420m },
                    { 45, "Menu_Arabic", "Slow-cooked Arabian rice with tender spiced chicken.", "Non-Veg", "Chicken Mandi", null, "menu_arabic_1", 850m },
                    { 46, "Menu_Arabic", "Charcoal grilled chicken served with garlic sauce and salad.", "Non-Veg", "Al Faham Chicken", null, "menu_arabic_2", 750m },
                    { 47, "Menu_Arabic", "Roasted chicken spiced with bell peppers, onion, and mint sauce.", "Non-Veg", "Shawarma Platter", null, "menu_arabic_3", 620m },
                    { 48, "Menu_Arabic", "Slow-cooked Arabian rice with tender spiced chicken.", "Non-Veg", "Chicken Mandi", null, "menu_arabic_4", 850m },
                    { 49, "Menu_Arabic", "Crispy falafel served with tahini dip, salad, and pita.", "Veg", "Falafel Plate", null, "menu_arabic_5", 450m },
                    { 50, "Menu_Arabic", "Crispy falafel served with tahini dip, salad, and pita.", "Veg", "Falafel Plate", null, "menu_arabic_6", 450m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 40);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 41);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 42);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 43);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 44);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 45);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 46);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 47);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 48);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 49);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 50);
        }
    }
}
