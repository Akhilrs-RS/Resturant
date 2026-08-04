using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddDietaryType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DietaryType",
                table: "CatalogPrices",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 1,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 2,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 3,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 4,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 5,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 6,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 7,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 8,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 9,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 10,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 11,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 12,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 13,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 14,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 15,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 16,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 17,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 18,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 19,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 20,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 21,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 22,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 23,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 24,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 25,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 26,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 27,
                column: "DietaryType",
                value: null);

            migrationBuilder.UpdateData(
                table: "CatalogPrices",
                keyColumn: "Id",
                keyValue: 28,
                column: "DietaryType",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DietaryType",
                table: "CatalogPrices");
        }
    }
}
