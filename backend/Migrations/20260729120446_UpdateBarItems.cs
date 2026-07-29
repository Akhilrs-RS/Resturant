using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateBarItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 17,
                columns: new[] { "Description", "DisplayName", "Price" },
                values: new object[] { "Classic whiskey mixed with orange peel, aromatic bitters, and a touch of magic.", "Golden Citrus Old Fashioned", 850m });

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 18,
                columns: new[] { "Description", "DisplayName", "ItemKey", "Price" },
                values: new object[] { "Vodka, pineapple, passion fruit, and lime with a golden sunset finish.", "Tropical Sunset Martini", "bar_cocktail_2", 750m });

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 19,
                columns: new[] { "Description", "DisplayName", "ItemKey", "Price" },
                values: new object[] { "White rum, dark lime, and sparkling soda with coastal freshness.", "Ocean Breeze Mojito", "bar_cocktail_3", 700m });

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 20,
                columns: new[] { "Description", "DisplayName", "ItemKey", "Price" },
                values: new object[] { "Rum, ginger beer, lime, and spices served ice cold classic.", "Spiced Island Mule", "bar_cocktail_4", 780m });

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 21,
                columns: new[] { "Description", "DisplayName", "ItemKey", "Price" },
                values: new object[] { "Gin, fresh raspberries, lemon juice, and a velvety smooth foam.", "Velvet Raspberry Sour", "bar_cocktail_5", 820m });

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 22,
                columns: new[] { "Description", "DisplayName", "ItemKey", "Price" },
                values: new object[] { "Premium vodka, fresh espresso, and coffee liqueur for a bold night.", "Midnight Espresso", "bar_cocktail_6", 900m });

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 23,
                columns: new[] { "Description", "DisplayName", "ItemKey", "Price" },
                values: new object[] { "Bourbon infused with applewood smoke and pure maple syrup.", "Smoked Maple Bourbon", "bar_cocktail_7", 950m });

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 24,
                columns: new[] { "Description", "DisplayName", "ItemKey", "Price" },
                values: new object[] { "Botanical gin, fresh lemon, and a splash of sparkling water.", "Sapphire Gin Fizz", "bar_cocktail_8", 680m });

            migrationBuilder.InsertData(
                table: "CatalogPrices",
                columns: new[] { "Id", "Category", "Description", "DisplayName", "ImageUrl", "ItemKey", "Price" },
                values: new object[,]
                {
                    { 25, "Bar", "Mint, lime, and soda without the alcohol.", "Virgin Mojito", null, "bar_mocktail_1", 350m },
                    { 26, "Bar", "Tropical blend of pineapple, orange, and grenadine.", "Sunset Punch", null, "bar_mocktail_2", 400m },
                    { 27, "Bar", "A robust red wine from our private cellar.", "House Red Wine", null, "bar_wine_1", 1200m },
                    { 28, "Bar", "12-year aged scotch whiskey served neat.", "Aged Single Malt", null, "bar_spirits_1", 1800m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 17,
                columns: new[] { "Description", "DisplayName", "Price" },
                values: new object[] { "Handcrafted drinks prepared by expert mixologists.", "Signature Cocktails", 450m });

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 18,
                columns: new[] { "Description", "DisplayName", "ItemKey", "Price" },
                values: new object[] { "Zero-proof creations bursting with flavor.", "Premium Mocktails", "bar_mocktail_1", 300m });

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 19,
                columns: new[] { "Description", "DisplayName", "ItemKey", "Price" },
                values: new object[] { "Curated vintages from renowned vineyards.", "Wine Selection", "bar_wine_1", 950m });

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 20,
                columns: new[] { "Description", "DisplayName", "ItemKey", "Price" },
                values: new object[] { "Rare whiskeys, cognacs, and fine liqueurs.", "Spirits", "bar_spirits_1", 1200m });

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 21,
                columns: new[] { "Description", "DisplayName", "ItemKey", "Price" },
                values: new object[] { "Locally sourced artisanal craft beers.", "Craft Brews", "bar_cocktail_2", 380m });

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 22,
                columns: new[] { "Description", "DisplayName", "ItemKey", "Price" },
                values: new object[] { "A refreshing mix of pineapple, mango, and passionfruit.", "Tropical Punch", "bar_mocktail_2", 280m });

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 23,
                columns: new[] { "Description", "DisplayName", "ItemKey", "Price" },
                values: new object[] { "Premium sparkling champagnes imported directly from France.", "Champagne Select", "bar_wine_2", 1850m });

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 24,
                columns: new[] { "Description", "DisplayName", "ItemKey", "Price" },
                values: new object[] { "A selection of fine and rare single malt whiskeys.", "Rare Vintage Malt", "bar_spirits_2", 2400m });
        }
    }
}
