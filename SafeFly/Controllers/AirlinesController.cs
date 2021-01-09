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
    public class AirlinesController : ControllerBase
    {

        private readonly ILogger<AirlinesController> _logger;

        public AirlinesController(ILogger<AirlinesController> logger)
        {
            _logger = logger;
        }

        [HttpGet("get-airlines")]
        public async Task<List<AirlineModel>> GetAirlines()
        {
            List<AirlineModel> airlines = new List<AirlineModel>();

            using (var connection = GetOpenConnection())
            {
                airlines = connection.Query<AirlineModel>(@"SELECT * FROM Airlines").ToList();
            }

            return airlines;
        }

        [HttpGet("get-airline/{airlineId}")]
        public async Task<AirlineModel> GetAirline(int airlineId)
        {
            AirlineModel airline = new AirlineModel();
            using (var connection = GetOpenConnection())
            {
                airline = connection.Query<AirlineModel>(
                     @"select * from Airlines where AirlineId = " + airlineId).FirstOrDefault();
            }

            return airline;
        }

        [HttpPost("add-airline")]
        public async Task Post([FromBody] AirlineModel airline)
        {          
            string url = "https://localhost:44393/airlines/add-airline/";
            try
            {
                using (var httpClient = new HttpClient())
                {
                    var stringContent = new StringContent(JsonConvert.SerializeObject(airline), Encoding.UTF8, "application/json");                    
                    using (var response = await httpClient.PostAsync(url, stringContent))
                    {
                        await response.Content.ReadAsStringAsync();
                    }
                }
            }
            catch (Exception e)
            {
                _logger.LogError("ERROR Adding airline to database: " + e.Message);
            }           
        }

        [HttpPost("edit-airline")]
        public async Task PostEdit([FromBody] AirlineModel airline)
        {
            string url = "https://localhost:44393/airlines/edit-airline/";
            try
            {
                using (var httpClient = new HttpClient())
                {
                    var stringContent = new StringContent(JsonConvert.SerializeObject(airline), Encoding.UTF8, "application/json");
                    using (var response = await httpClient.PostAsync(url, stringContent))
                    {
                        await response.Content.ReadAsStringAsync();
                    }
                }
            }
            catch (Exception e)
            {
                _logger.LogError("ERROR Editing airline: " + e.Message);
            }
        }

        [HttpPost("delete-airline/{airlineId}")]
        public async Task PostDelete(int airlineId)
        {
            string url = "https://localhost:44393/airlines/delete-airline/" + airlineId;
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
                _logger.LogError("ERROR Deleting airline from the database: " + e.Message);
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
