using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ReservationService.Models;
using ReservationService.ViewModels;
using System;
using System.Data.Common;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;

namespace ReservationService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OpenWeatherController : ControllerBase
    {

        private readonly ILogger<OpenWeatherController> _logger;

        public OpenWeatherController(ILogger<OpenWeatherController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{airportId}")]
        public OpenWeatherModel Get(int airportId)
        {
            AirportModel airport = new AirportModel();
            using (var connection = GetOpenConnection())
            {
               airport  = connection.Query<AirportModel>(
                    @"select AirportId, AirportName, CountryName, AirportCode, Latitude, Longitude
                        from Airports where AirportId = " + airportId).FirstOrDefault();//<= TODO: use parameters
            }
            //TODO: add link to config
            string urlBase = "http://api.openweathermap.org/data/2.5/onecall?lat={0}&lon={1}&exclude=minutely,hourly,daily&APPID=6ce31626181846df8fb15eed32a345b0&units=metric";
            string url = String.Format(urlBase, airport.Latitude, airport.Longitude);
            OpenWeatherViewModel weatherForecastViewModel = new OpenWeatherViewModel();
            string answer;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                answer = reader.ReadToEnd();
            }

            weatherForecastViewModel = JsonConvert.DeserializeObject<OpenWeatherViewModel>(answer);

            OpenWeatherModel model = new OpenWeatherModel();

            model = new OpenWeatherModel
            {
                CountryName = airport.AirportName,//TODO: change property to airpirtName
                Sunrise = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc).AddSeconds(weatherForecastViewModel.Current.Sunrise).ToLocalTime(),
                Sunset = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc).AddSeconds(weatherForecastViewModel.Current.Sunset).ToLocalTime(),
                Temperature = weatherForecastViewModel.Current.Temp,
                WeatherMainDescription = weatherForecastViewModel.Current.Weather.Select(w => w.Main).Aggregate((i, j) => i + " " + j),
                Updated = DateTime.Now,
                Icon = "http://openweathermap.org/img/wn/" + weatherForecastViewModel.Current.Weather.First()?.Icon + "@2x.png"
        };

            return model;
        }

        public static DbConnection GetOpenConnection()
        {
            string connectionString = $"Server=(local);Database=SafeFly;User ID=sa;Password=sa_account;MultipleActiveResultSets=true";
            var connection = new SqlConnection(connectionString);
            connection.Open();

            return connection;
        }
    }
}
