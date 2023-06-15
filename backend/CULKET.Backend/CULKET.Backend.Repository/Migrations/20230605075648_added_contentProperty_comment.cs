using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CULKET.Backend.Repository.Migrations
{
    public partial class added_contentProperty_comment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Discussions_Users_CreatedUserId",
                table: "Discussions");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedUserId",
                table: "Discussions",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Comments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Discussions_Users_CreatedUserId",
                table: "Discussions",
                column: "CreatedUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Discussions_Users_CreatedUserId",
                table: "Discussions");

            migrationBuilder.DropColumn(
                name: "Content",
                table: "Comments");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedUserId",
                table: "Discussions",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_Discussions_Users_CreatedUserId",
                table: "Discussions",
                column: "CreatedUserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
