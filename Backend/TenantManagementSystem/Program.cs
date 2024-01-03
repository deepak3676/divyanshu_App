using Domain_Layer.Application;
using Domain_Layer.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Repository_Layer.IRepository;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Repository_Layer.EventRepo;
using Repository_Layer.IEventRepo;
using Repository_Layer.IRepository;
using Repository_Layer.ProjectRepo;
using Repository_Layer.Repository;
using Service_Layer.Custom_Service;
using Service_Layer.EventService;
using Service_Layer.ICustomService;
using Service_Layer.IEventService;
using static Repository_Layer.IRepository.IRepository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add repository to the container
builder.Services.AddScoped(typeof(ICouponRepo<>), typeof(CouponRepo<>));
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

builder.Services.AddScoped(typeof(IAttRepository<>), typeof(AttRepository<>));
builder.Services.AddScoped<IAttService<Attendances>, AttService>();

builder.Services.AddScoped<ILoginRepo, LoginRepo>();
builder.Services.AddScoped<ILoginService, LoginService>();
// Add services to the container.
builder.Services.AddScoped<ICouponServices<Coupon>, CouponServices>();
builder.Services.AddScoped<ICustomService<Management>, Custom_Service>();

builder.Services.AddScoped(typeof(IProjectRepo<>), typeof(ProjectRepo<>));

builder.Services.AddScoped(typeof(TaskInterface1<>), typeof(TaskRepository<>));
builder.Services.AddScoped<TaskServiceInterface1<taskStructure>, TaskService>();




builder.Services.AddScoped<IProjectService<projectModel>, ProjectService>();
builder.Services.AddScoped(typeof(IEventRepo<>), typeof(EventRepo<>));
builder.Services.AddScoped<IEventService<Event>, EventService>();

builder.Services.AddScoped<IApplyLeaveService<ApplyLeave>, ApplyLeaveService>();

builder.Services.AddScoped(typeof(IApplyLeaveRepo<>), typeof(ApplyLeaveRepo<>));



builder.Services.AddScoped(typeof(ISalaryReport<>), typeof(SalaryReport<>));
builder.Services.AddScoped<ISalaryService, SalaryService>();



var app = builder.Build();


    app.UseSwagger();
    app.UseSwaggerUI();


app.UseCors(builder => builder.
WithOrigins("http://localhost:4200")
.AllowAnyMethod()
.AllowAnyHeader());

app.UseAuthorization();

app.MapControllers();

app.Run();
