using ClientService.Models;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Data.SqlClient;

namespace ClientService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NomenclatoareController : ControllerBase
    {

        [HttpGet("airports")]
        public async Task<List<AirportModel>> Get()
        {
            List<AirportModel> airports = new List<AirportModel>();
            using (var connection = GetOpenConnection())
            {
                airports = connection.Query<AirportModel>(
                     @"select AirportId, AirportName, CountryName, AirportCode, Latitude, Longitude
                        from Airports").ToList();
            }

            return airports;
        }

        public static DbConnection GetOpenConnection()
        {
            string connectionString = $"Server=(local);Database=SafeFly;User ID=sa;Password=dana;MultipleActiveResultSets=true";
            var connection = new SqlConnection(connectionString);
            connection.Open();

            return connection;
        }
    }

}
