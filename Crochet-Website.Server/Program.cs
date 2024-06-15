using Crochet_Website.Server.Data;
using Crochet_Website.Server.Interfaces;
using Crochet_Website.Server.Repository;
using Microsoft.EntityFrameworkCore;

var AllowedSpecificOrigins = "_allowedSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("connectionStrings.json", optional: false);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowedSpecificOrigins,
        policy =>
        {
            var acceptedURL = builder.Configuration.GetSection("CorsPolicy").Value;
            if (acceptedURL != null)
            {
                policy.WithOrigins(acceptedURL);
            }
        });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataContext>(options =>
{
    var connect = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseSqlServer(connect);
});

builder.Services.AddScoped<IProductRepository, ProductRepository>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(AllowedSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
