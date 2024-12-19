using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;

public class WeatherService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public WeatherService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _apiKey = configuration["OpenWeatherApiKey"];  
    }

    public async Task<WeatherData> GetWeatherAsync(string city)
    {
        var url = $"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={_apiKey}&units=metric";
        var response = await _httpClient.GetStringAsync(url);
        return JsonConvert.DeserializeObject<WeatherData>(response);
    }
}

public class WeatherData
{
    public MainData Main { get; set; }
    public string Name { get; set; }
    public int Cod { get; set; }

    public class MainData
    {
        public float Temp { get; set; }
        public float Humidity { get; set; }
    }
     public class Weather
    {
        public string Description { get; set; }
        public string Icon { get; set; }
    }
}

