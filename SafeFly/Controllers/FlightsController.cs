using ClientService.Models;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace ClientService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FlightsController : ControllerBase
    {
        [HttpGet("{takeOffAirport}/{landingAirport}/{takeOffDate}/{landingDate}")]
        public async Task<List<FlightModels>> Get(int? takeOffAirport, int? landingAirport, DateTime? takeOffDate, DateTime? landingDate)
        {
            //TODO: Change GET into POST to allow nullables and other parameters. Move this function to reservationService
            List<FlightModels> flights = new List<FlightModels>();

           
            DynamicParameters dp = new DynamicParameters();
            dp.Add("TakeOffAirport", takeOffAirport, DbType.Int32);
            dp.Add("LandingAirport", landingAirport, DbType.Int32);
            dp.Add("TakeOffDate", takeOffDate, DbType.DateTime);
            dp.Add("LandingDate", landingDate, DbType.DateTime);

            using (var connection = GetOpenConnection())
            {
                flights = connection.Query<FlightModels>("uspSelectFlights", dp, commandType: CommandType.StoredProcedure).ToList();
            }

            return flights;
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
