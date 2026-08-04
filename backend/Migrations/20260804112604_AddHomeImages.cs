using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddHomeImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "CatalogPrices",
                columns: new[] { "Id", "Category", "Description", "DietaryType", "DisplayName", "ImageUrl", "ItemKey", "Price" },
                values: new object[,]
                {
                    { 51, "Home_Images", "Image for the Dining section on the Home page.", null, "Home Dining Section Image", null, "home_dining", 0m },
                    { 52, "Home_Images", "Image for the Pool section on the Home page.", null, "Home Pool Section Image", null, "home_pool", 0m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 51);

            migrationBuilder.DeleteData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 52);
        }
    }
}
