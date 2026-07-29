using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddBarCatalogItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "CatalogPrices",
                columns: new[] { "Id", "Category", "Description", "DisplayName", "ImageUrl", "ItemKey", "Price" },
                values: new object[,]
                {
                    { 17, "Bar", "Handcrafted drinks prepared by expert mixologists.", "Signature Cocktails", null, "bar_cocktail_1", 450m },
                    { 18, "Bar", "Zero-proof creations bursting with flavor.", "Premium Mocktails", null, "bar_mocktail_1", 300m },
                    { 19, "Bar", "Curated vintages from renowned vineyards.", "Wine Selection", null, "bar_wine_1", 950m },
                    { 20, "Bar", "Rare whiskeys, cognacs, and fine liqueurs.", "Spirits", null, "bar_spirits_1", 1200m },
                    { 21, "Bar", "Locally sourced artisanal craft beers.", "Craft Brews", null, "bar_cocktail_2", 380m },
                    { 22, "Bar", "A refreshing mix of pineapple, mango, and passionfruit.", "Tropical Punch", null, "bar_mocktail_2", 280m },
                    { 23, "Bar", "Premium sparkling champagnes imported directly from France.", "Champagne Select", null, "bar_wine_2", 1850m },
                    { 24, "Bar", "A selection of fine and rare single malt whiskeys.", "Rare Vintage Malt", null, "bar_spirits_2", 2400m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 24);
        }
    }
}
