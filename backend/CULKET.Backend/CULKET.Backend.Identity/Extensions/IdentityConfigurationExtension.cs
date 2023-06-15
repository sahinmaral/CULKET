using CULKET.Backend.Core.Models;
using CULKET.Backend.Repository;

using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace CULKET.Backend.Identity.Extensions
{
    public static class IdentityConfigurationExtension
    {

        /// <summary>
        /// Adds custom password and user validator , error describer and default configurations
        /// </summary>
        /// <param name="serviceDescriptors"></param>
        public static void AddIdentityWithConfigurations(this IServiceCollection serviceDescriptors)
        {
            serviceDescriptors.AddIdentity<User, Role>(opt =>
            {
                opt.Password.RequiredLength = 4;
                opt.User.RequireUniqueEmail = true;
                opt.User.AllowedUserNameCharacters =
                        "abcçdefgğhijklmnoöpqrsştuüvwxyzABCÇDEFGĞHIİJKLMNOÖPQRSŞTUÜVWXYZ0123456789-._";
            })
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();

            serviceDescriptors.Configure<DataProtectionTokenProviderOptions>(config =>
            {
                config.TokenLifespan = TimeSpan.FromHours(3);
            });
        }
    }
}
