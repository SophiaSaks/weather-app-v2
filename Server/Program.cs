using WeatherApiExample.Services;

var builder = WebApplication.CreateBuilder(args);

// Register WeatherService
builder.Services.AddHttpClient<WeatherService>();

builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();

app.Run();
