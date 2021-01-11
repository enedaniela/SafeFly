using ClientService.Models;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using Microsoft.Extensions.Logging;
using System;
using Newtonsoft.Json;
using System.Text;

namespace ClientService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AirportsController : ControllerBase
    {

        private readonly ILogger<AirportsController> _logger;

        public AirportsController(ILogger<AirportsController> logger)
        {
            _logger = logger;
        }

        [HttpGet("get-airports")]
        public async Task<List<AirportModel>> Get()
        {
            List<AirportModel> airports = new List<AirportModel>();
            using (var connection = GetOpenConnection())
            {
                airports = connection.Query<AirportModel>(@"SELECT * FROM Airports").ToList();
            }

            return airports;
        }

        [HttpGet("get-airport/{airportId}")]
        public async Task<AirportModel> Get(int airportId)
        {
            AirportModel airport = new AirportModel();
            using (var connection = GetOpenConnection())
            {
                airport = connection.Query<AirportModel>(
                     @"select * from Airports where AirportId = " + airportId).FirstOrDefault();
            }

            return airport;
        }

        [HttpPost("add-airport")]
        public async Task Post([FromBody] AirportModel airport)
        {
            string url = "https://localhost:44393/airports/add-airport/";
            try
            {
                using (var httpClient = new HttpClient())
                {
                    var stringContent = new StringContent(JsonConvert.SerializeObject(airport), Encoding.UTF8, "application/json");
                    using (var response = await httpClient.PostAsync(url, stringContent))
                    {
                        await response.Content.ReadAsStringAsync();
                    }
                }
            }
            catch (Exception e)
            {
                _logger.LogError("ERROR Adding airport to database: " + e.Message);
            }
        }

        [HttpPost("edit-airport")]
        public async Task PostEdit([FromBody] AirportModel airport)
        {
            string url = "https://localhost:44393/airports/edit-airport/";
            try
            {
                using (var httpClient = new HttpClient())
                {
                    var stringContent = new StringContent(JsonConvert.SerializeObject(airport), Encoding.UTF8, "application/json");
                    using (var response = await httpClient.PostAsync(url, stringContent))
                    {
                        await response.Content.ReadAsStringAsync();
                    }
                }
            }
            catch (Exception e)
            {
                _logger.LogError("ERROR Editing airport: " + e.Message);
            }
        }

        [HttpPost("delete-airport/{airportId}")]
        public async Task PostDelete(int airportId)
        {
            string url = "https://localhost:44393/airports/delete-airport/" + airportId;
            try
            {
                using (var httpClient = new HttpClient())
                {
                    using (var response = await httpClient.PostAsync(url, null))
                    {
                        await response.Content.ReadAsStringAsync();
                    }
                }
            }
            catch (Exception e)
            {
                _logger.LogError("ERROR Deleting airport from the database: " + e.Message);
            }
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
