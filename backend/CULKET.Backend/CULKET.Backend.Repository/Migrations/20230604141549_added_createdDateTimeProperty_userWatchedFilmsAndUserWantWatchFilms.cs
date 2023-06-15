using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CULKET.Backend.Repository.Migrations
{
    public partial class added_createdDateTimeProperty_userWatchedFilmsAndUserWantWatchFilms : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "UserWatchedFilms",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "UserWantWatchFilms",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "UserWatchedFilms");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "UserWantWatchFilms");
        }
    }
}
