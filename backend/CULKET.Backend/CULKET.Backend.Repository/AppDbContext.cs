using CULKET.Backend.Core.Models;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using System.Reflection;

namespace CULKET.Backend.Repository
{
    public class AppDbContext : IdentityDbContext<User, Role, string>
    {
        // Program.cs uzerinden veritabanimizin konfigurasyonlarini belirlemek icin
        // DbContextOptions sinifini constructor metot parametresine yaziyoruz
        public AppDbContext(DbContextOptions<AppDbContext> contextOptions) : base(contextOptions)
        {

        }

        public override int SaveChanges()
        {
            foreach (var entry in ChangeTracker.Entries())
            {
                if (entry.Entity is BaseEntity entityReference)
                {
                    switch (entry.State)
                    {
                        case EntityState.Added:
                            Entry(entityReference).Property(x => x.UpdatedDate).IsModified = false;

                            entityReference.CreatedDate = DateTime.Now;
                            break;
                        case EntityState.Modified:
                            Entry(entityReference).Property(x => x.CreatedDate).IsModified = false;

                            entityReference.UpdatedDate = DateTime.Now;
                            break;
                    }
                }
            }

            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            foreach (var entry in ChangeTracker.Entries())
            {
                if(entry.Entity is BaseEntity entityReference)
                {
                    switch (entry.State)
                    {
                        case EntityState.Added:
                            Entry(entityReference).Property(x => x.UpdatedDate).IsModified = false;

                            entityReference.CreatedDate= DateTime.Now;
                            break;
                        case EntityState.Modified:
                            Entry(entityReference).Property(x => x.CreatedDate).IsModified = false;

                            entityReference.UpdatedDate= DateTime.Now;
                            break;
                    }
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Repository class library uzerindeki configuration lari uygular.
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable(name: "Users");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable(name: "Roles");
            });

            modelBuilder.Entity<IdentityUserRole<string>>(entity =>
            {
                entity.ToTable("UserRoles");
                //in case you chagned the TKey type
                //  entity.HasKey(key => new { key.UserId, key.RoleId });
            });

            modelBuilder.Entity<IdentityUserClaim<string>>(entity =>
            {
                entity.ToTable("UserClaims");
            });

            modelBuilder.Entity<IdentityUserLogin<string>>(entity =>
            {
                entity.ToTable("UserLogins");
                //in case you chagned the TKey type
                //  entity.HasKey(key => new { key.ProviderKey, key.LoginProvider });       
            });

            modelBuilder.Entity<IdentityRoleClaim<string>>(entity =>
            {
                entity.ToTable("RoleClaims");

            });

            modelBuilder.Entity<IdentityUserToken<string>>(entity =>
            {
                entity.ToTable("UserTokens");
                //in case you chagned the TKey type
                // entity.HasKey(key => new { key.UserId, key.LoginProvider, key.Name });
            });

            modelBuilder.Entity<FilmGenre>().HasKey(x => new { x.FilmId , x.GenreId});

            modelBuilder.Entity<UserWantWatchFilm>().HasKey(x => new { x.FilmId, x.UserId });
            modelBuilder.Entity<UserWatchedFilm>().HasKey(x => new { x.FilmId, x.UserId });

            modelBuilder.Entity<Film>().ToTable("Films");
            modelBuilder.Entity<Genre>().ToTable("Genres");

            modelBuilder.Entity<UserWantWatchFilm>().ToTable("UserWantWatchFilms");
            modelBuilder.Entity<UserWatchedFilm>().ToTable("UserWatchedFilms");
        }

        public DbSet<Film> Films { get; set; }
        public DbSet<Film> Genres { get; set; }
        public DbSet<Discussion> Discussions { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}
