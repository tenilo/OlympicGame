using OlympicGame.Interfaces;
using OlympicGame.Middlewares;
using OlympicGame.Repositories;
using webapi.Interfaces;
using webapi.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<IConfigurationRoot>(builder.Configuration);
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddCors(options =>
{
    options.AddPolicy("DEFAULT_POLICY", builder =>
    {
        //on autorise toutes les origines, en-tête et méthodes à acceder à l'api
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});
builder.Services.AddSingleton<IConnection, ConnectionMiddleware>();
builder.Services.AddSingleton<IOffreRepository, OffreRepository>();
builder.Services.AddSingleton<IUserRepository, UserRepository>();

var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("DEFAULT_POLICY");
//app.UseHttpsRedirection();

app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");


//app.MapControllers();

app.Run();
