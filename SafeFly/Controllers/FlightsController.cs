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

        [HttpGet("takeOff/{takeOffAirport}")]
        public async Task<List<FlightModels>> GetTakeOffFlights(int? takeOffAirport)
        {
            List<FlightModels> flights = new List<FlightModels>();

            using (var connection = GetOpenConnection())
            {
                flights = connection.Query<FlightModels>(
                     @"SELECT FlightId, FlightNumber, a1.AirportName as TakeOffAirportDescription, TakeOffDate, a2.AirportName as LandingAirportDescription, LandingDate, Price 
                       FROM Flights f inner join Airports a1 on f.TakeOffAirport = a1.AirportId 
                       inner join Airports a2 on f.LandingAirport = a2.AirportId
                       WHERE TakeOffAirport = " + takeOffAirport).ToList();
            }

            return flights;
        }

        [HttpGet("landing/{landingAirport}")]
        public async Task<List<FlightModels>> GetLandingFlights(int? landingAirport)
        {
            List<FlightModels> flights = new List<FlightModels>();

            using (var connection = GetOpenConnection())
            {
                flights = connection.Query<FlightModels>(
                    @"SELECT FlightId, FlightNumber, a1.AirportName as TakeOffAirportDescription, TakeOffDate, a2.AirportName as LandingAirportDescription, LandingDate, Price 
                       FROM Flights f inner join Airports a1 on f.LandingAirport = a1.AirportId 
                       inner join Airports a2 on f.LandingAirport = a2.AirportId
                       WHERE LandingAirport = " + landingAirport).ToList();
            }

            return flights;
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
