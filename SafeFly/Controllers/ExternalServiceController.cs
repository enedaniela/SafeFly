using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using ClientService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace SafeFly.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExternalServiceController : ControllerBase
    {

        private readonly ILogger<ExternalServiceController> _logger;

        public ExternalServiceController(ILogger<ExternalServiceController> logger)
        {
            _logger = logger;
        }

        [HttpGet("covid/{airportId}")]
        public async Task<Covid19Model> Get(int airportId)
        {
            Covid19Model covidList = new Covid19Model();
            string url = "https://localhost:44393/rapidapicovid19/" + airportId;//TODO: Move this link to config
            try
            {
                using (var httpClient = new HttpClient())
                {
                    using (var response = await httpClient.GetAsync(url))
                    {
                        string apiResponse = await response.Content.ReadAsStringAsync();
                        covidList = JsonConvert.DeserializeObject<Covid19Model>(apiResponse);
                    }
                }
            }
            catch (Exception e)
            {
                _logger.LogError("ERROR Getting Covid data from Worker: " + e.Message);
            }

            return covidList;
        }


        [HttpGet("weather/{airportId}")]
        public async Task<OpenWeatherModel> GetWeather(int airportId)
        {
            OpenWeatherModel weatherForecast = new OpenWeatherModel();
            string url = "https://localhost:44393/openweather/" + airportId;//TODO: Move this link to config
            try
            {
                using (var httpClient = new HttpClient())
                {
                    using (var response = await httpClient.GetAsync(url))
                    {
                        string apiResponse = await response.Content.ReadAsStringAsync();
                        weatherForecast = JsonConvert.DeserializeObject<OpenWeatherModel>(apiResponse);
                    }
                }
            }
            catch (Exception e)
            {
                _logger.LogError("ERROR Getting WeatherForecast data from Reservation Service: " + e.Message);
            }

            return weatherForecast;
        }
    }
}
