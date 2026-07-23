using TodoApp.Application.Interfaces;
using TodoApp.Application.Services;
using TodoApp.Infrastructure;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//DI Registration

builder.Services.AddSingleton<IToDoRepository, InMemoryToDoRepository>();
builder.Services.AddScoped<IToDoService, ToDoService>();

//CORS for Angular Dev Server
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev", policy => 
    {
        policy.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

if(app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAngularDev");
app.UseAuthorization();
app.MapControllers();

app.Run();

public partial class Program {}
