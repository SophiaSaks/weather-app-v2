using System.Net.Http;
using System.Threading.Tasks;
using System;

namespace WeatherApiExample.Services
{
    public class WeatherService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey = "5934d7c41c30f5c76770d6a905d6848e";  // Replace with your OpenWeatherMap API key
        private readonly string _baseUrl = "https://api.openweathermap.org/data/2.5/weather";

        public WeatherService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> GetWeatherAsync(string city)
        {
            var url = $"{_baseUrl}?q={city}&appid={_apiKey}&units=metric"; // Adding units=metric for Celsius

            try
            {
                var response = await _httpClient.GetStringAsync(url);
                return response; // Returns the raw JSON response from the OpenWeatherMap API
            }
            catch (Exception ex)
            {
                return $"Error: {ex.Message}"; // Handle errors like connection issues
            }
        }
    }
}
