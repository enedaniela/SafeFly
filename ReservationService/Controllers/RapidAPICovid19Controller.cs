using Dapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ReservationService.Models;
using ReservationService.ViewModels;
using System.Data.Common;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;

namespace ReservationService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RapidAPICovid19Controller : ControllerBase
    {
        [HttpGet("{airportId}")]
        public Covid19Model Get(int airportId)
        {
            AirportModel airport = new AirportModel();
      
            using (var connection = GetOpenConnection())
            {
                airport = connection.Query<AirportModel>(
                        @"select AirportId, AirportName, CountryName, AirportCode, Latitude, Longitude
                            from Airports where AirportId = " + airportId).FirstOrDefault();//<= TODO: use parameters
            }


            Covid19ViewModel covidData = new Covid19ViewModel();
            //TODO: add link to config
            string url = "https://covid-193.p.rapidapi.com/statistics?country=" + airport.CountryName;
            string answer;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;

            //TODO: add these to config
            request.Headers.Add("x-rapidapi-key: 7a9ab3b348mshfd960b72abb93f5p1b5cbajsn7b6c5b1140b7");
            request.Headers.Add("x-rapidapi-host: covid-193.p.rapidapi.com");
            request.Headers.Add("useQueryString: true");

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                answer = reader.ReadToEnd();
            }

            covidData = JsonConvert.DeserializeObject<Covid19ViewModel>(answer);
            Covid19Model model = new Covid19Model();

            covidData.Response.ForEach(c =>
                model = new Covid19Model
                {
                    CountryName = c.Country,
                    Continent = c.Continent,
                    Cases = c.Cases.Total == null ? 0 : (int)c.Cases.Total,
                    NewCases = c.Cases.New == null ? 0 : int.Parse(c.Cases.New.Split('+')[1]),
                    Deaths = c.Deaths.Total == null ? 0 : (int)c.Deaths.Total,
                    NewDeaths = c.Deaths.New == null ? 0 : int.Parse(c.Deaths.New.Split('+')[1]),
                    Recoverd = c.Cases.Recovered == null ? 0 : (int)c.Cases.Recovered,
                    Tests = c.Tests.Total == null ? 0 : (int)c.Tests.Total,
                    Updated = c.Time
                }
            ) ;

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
