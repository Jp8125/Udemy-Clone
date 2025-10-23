using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;
using Udemy.Interfaces;
using Udemy.Models;
using Udemy.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IUser, UserRepo>();
builder.Services.AddScoped<ICategory, CategoryRepo>();
builder.Services.AddScoped<ITopic,TopicRepo>();
builder.Services.AddScoped<IPayment, PaymentRepo>();
builder.Services.AddScoped<IPurchase,PurchaseRepo>();
builder.Services.AddScoped<IPurchaseItem,PurchaseItemRepo>();
builder.Services.AddScoped<ISubTopic,SubTopicRepo>();
builder.Services.AddScoped<IMediaResources,MediaResourceRepo>();
builder.Services.AddScoped<ICourse,CourseRepo>();
builder.Services.AddScoped<IProgress,ProgressRepo>();
builder.Services.AddScoped<IUserServices,UserServicesRepo>();
builder.Services.AddScoped<IOtp, OtpRepo>();
builder.Services.AddScoped<IS3services, S3ServiceRepo>();
builder.Services.AddScoped<ICart, CartRepo>();
builder.Services.AddScoped<ICourseService, CourseServiceRepo>();


builder.Services.AddCors(option => option.AddPolicy(name: "corsepolicy", policy => policy.AllowAnyHeader()
.AllowAnyOrigin().AllowAnyMethod()));



builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddDbContext<UdemyContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
var tc = builder.Configuration.GetSection("Jwt");
builder.Services.AddAuthentication().AddJwtBearer(option => option.
TokenValidationParameters = new TokenValidationParameters
{
    ValidateIssuer = true,
    ValidateAudience = true,
    ValidateLifetime = true,
    ValidateIssuerSigningKey = true,
    ValidIssuer = tc["Issuer"],
    ValidAudience = tc["Audience"],
    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tc["Key"]))
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors("corsepolicy");
app.MapControllers();

app.Run();
