using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WeatherApiExample.Services;

namespace WeatherApiExample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherController : ControllerBase
    {
        private readonly WeatherService _weatherService;

        public WeatherController(WeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        [HttpGet("{city}")]
        public async Task<IActionResult> GetWeather(string city)
        {
            var weatherData = await _weatherService.GetWeatherAsync(city);

            if (weatherData.StartsWith("Error"))
            {
                return StatusCode(500, weatherData); // Return an error message if there's an issue
            }

            return Ok(weatherData); // Return the raw JSON response from OpenWeatherMap
        }
    }
}
