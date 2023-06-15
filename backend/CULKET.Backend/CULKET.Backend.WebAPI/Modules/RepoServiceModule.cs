using CULKET.Backend.Core.Repositories;
using CULKET.Backend.Core.Services;
using CULKET.Backend.Core.UnitOfWorks;
using CULKET.Backend.Repository.Repositories;
using CULKET.Backend.Repository.UnitOfWorks;
using CULKET.Backend.Repository;
using CULKET.Backend.Service.Services;
using System.Reflection;
using Autofac;
using CULKET.Backend.Service.Mapping;
using CULKET.Backend.Identity;

namespace CULKET.Backend.WebAPI.Modules
{
    public class RepoServiceModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterGeneric(typeof(GenericRepository<>)).As(typeof(IGenericRepository<>)).InstancePerLifetimeScope();
            builder.RegisterGeneric(typeof(Service<,>)).As(typeof(IService<,>)).InstancePerLifetimeScope();

            //builder.RegisterGeneric(typeof(ServiceWithDto<,>)).As(typeof(IServiceWithDto<,>)).InstancePerLifetimeScope();

            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().InstancePerLifetimeScope();

            //builder.RegisterType<ProductServiceWithDto>().As<IProductServiceWithDto>().InstancePerLifetimeScope();
            //builder.RegisterType<CategoryServiceWithDto>().As<ICategoryServiceWithDto>().InstancePerLifetimeScope();

            var apiAssembly = Assembly.GetExecutingAssembly();
            var repoAssembly = Assembly.GetAssembly(typeof(AppDbContext));
            var serviceAssembly = Assembly.GetAssembly(typeof(MapProfile));
            var identityAssembly = Assembly.GetAssembly(typeof(UserAuthenticationService));

            builder.RegisterAssemblyTypes(apiAssembly, repoAssembly, serviceAssembly)
                .Where(x => x.Name.EndsWith("Repository"))
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();

            //string[] excludedClasses = Assembly.GetAssembly(typeof(ProductServiceWithCaching))
            //    .GetTypes()
            //    .Select(x => x.Name)
            //    .Where(x => x.Contains("Caching"))
            //    .ToArray();

            //builder.RegisterType<ProductServiceWithCaching>().As<IProductService>();

            //&& !excludedClasses.Contains(x.Name)

            builder.RegisterAssemblyTypes(apiAssembly, repoAssembly, serviceAssembly,identityAssembly)
                .Where(x => x.Name.EndsWith("Service"))
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();


        }
    }
}
