using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddCatalogPrices : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CatalogPrices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ItemKey = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Category = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DisplayName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatalogPrices", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "CatalogPrices",
                columns: new[] { "Id", "Category", "Description", "DisplayName", "ItemKey", "Price" },
                values: new object[,]
                {
                    { 1, "Suites", null, "Deluxe Room", "suite_deluxe", 250m },
                    { 2, "Suites", null, "Ocean Pool Villa", "suite_ocean", 480m },
                    { 3, "Suites", null, "Honeymoon Suite", "suite_honeymoon", 620m },
                    { 4, "Suites", null, "Presidential Villa", "suite_presidential", 1250m },
                    { 5, "Dining", null, "Cherish Pizza Catch", "dining_pizza", 34m },
                    { 6, "Dining", null, "Fresh Truffle Entree", "dining_truffle", 48m },
                    { 7, "Dining", null, "Coconut Mousse on Pastry", "dining_mousse", 24m },
                    { 8, "Dining", null, "Spiced Fruit Tea Cup", "dining_tea", 12m },
                    { 9, "Pool", null, "Hour Pass", "pool_hour", 240m },
                    { 10, "Pool", null, "Day Pass", "pool_day", 480m },
                    { 11, "Pool", null, "Cabana Reserve", "pool_cabana", 720m },
                    { 12, "Pool", null, "Sunset Pool Party", "pool_sunset", 960m },
                    { 13, "Events", null, "Traditional Wedding", "wedding_traditional", 240000m },
                    { 14, "Events", null, "Beachfront Wedding", "wedding_beachfront", 320000m },
                    { 15, "Events", null, "Rainforest Wedding", "wedding_rainforest", 280000m },
                    { 16, "Events", null, "Luxury Wedding", "wedding_luxury", 450000m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CatalogPrices");
        }
    }
}
