using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CULKET.Backend.Repository.Migrations
{
    public partial class added_isUserAddedWatchedFilmsAfterRegisterProperty_user : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsUserAddedWatchedFilmsAfterRegister",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsUserAddedWatchedFilmsAfterRegister",
                table: "Users");
        }
    }
}
