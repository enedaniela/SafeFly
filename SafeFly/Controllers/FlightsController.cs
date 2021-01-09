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
using System.Data;

namespace ClientService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FlightsController : ControllerBase
    {
        private readonly ILogger<FlightsController> _logger;

        public FlightsController(ILogger<FlightsController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{takeOffAirport}/{landingAirport}/{takeOffDate}/{landingDate}")]
        public async Task<List<FlightModel>> Get(int? takeOffAirport, int? landingAirport, DateTime? takeOffDate, DateTime? landingDate)
        {
            //TODO: Change GET into POST to allow nullables and other parameters. Move this function to reservationService
            List<FlightModel> flights = new List<FlightModel>();

           
            DynamicParameters dp = new DynamicParameters();
            dp.Add("TakeOffAirport", takeOffAirport, DbType.Int32);
            dp.Add("LandingAirport", landingAirport, DbType.Int32);
            dp.Add("TakeOffDate", takeOffDate, DbType.DateTime);
            dp.Add("LandingDate", landingDate, DbType.DateTime);

            using (var connection = GetOpenConnection())
            {
                flights = connection.Query<FlightModel>("uspSelectFlights", dp, commandType: CommandType.StoredProcedure).ToList();
            }

            return flights;
        }

        [HttpGet("takeOff/{takeOffAirport}")]
        public async Task<List<FlightModel>> GetTakeOffFlights(int? takeOffAirport)
        {
            List<FlightModel> flights = new List<FlightModel>();

            using (var connection = GetOpenConnection())
            {
                flights = connection.Query<FlightModel>(
                     @"SELECT FlightId, FlightNumber, a1.AirportName as TakeOffAirportDescription, TakeOffDate, a2.AirportName as LandingAirportDescription, a3.AirlineName as AirlineDescription, LandingDate, Status, NumberOfPassengers, Price 
                       FROM Flights f inner join Airports a1 on f.TakeOffAirport = a1.AirportId 
                       inner join Airports a2 on f.LandingAirport = a2.AirportId
                       inner join Airlines a3 on f.Airline = a3.AirlineId
                       WHERE TakeOffAirport = " + takeOffAirport).ToList();
            }

            return flights;
        }

        [HttpGet("landing/{landingAirport}")]
        public async Task<List<FlightModel>> GetLandingFlights(int? landingAirport)
        {
            List<FlightModel> flights = new List<FlightModel>();

            using (var connection = GetOpenConnection())
            {
                flights = connection.Query<FlightModel>(
                    @"SELECT FlightId, FlightNumber, a1.AirportName as TakeOffAirportDescription, TakeOffDate, a2.AirportName as LandingAirportDescription, a3.AirlineName as AirlineDescription, LandingDate, Status, NumberOfPassengers, Price 
                       FROM Flights f inner join Airports a1 on f.TakeOffAirport = a1.AirportId 
                       inner join Airports a2 on f.LandingAirport = a2.AirportId
                       inner join Airlines a3 on f.Airline = a3.AirlineId
                       WHERE LandingAirport = " + landingAirport).ToList();
            }

            return flights;
        }

        [HttpGet("get-from-airline/{airlineId}")]
        public async Task<List<FlightModel>> GetFlightsFromAirline(int? airlineId)
        {
            List<FlightModel> flights = new List<FlightModel>();

            using (var connection = GetOpenConnection())
            {
                flights = connection.Query<FlightModel>(
                    @"SELECT FlightId, FlightNumber, a1.AirportName as TakeOffAirportDescription, TakeOffDate, a2.AirportName as LandingAirportDescription, a3.AirlineName as AirlineDescription, LandingDate, Status, NumberOfPassengers, Price 
                       FROM Flights f inner join Airports a1 on f.TakeOffAirport = a1.AirportId 
                       inner join Airports a2 on f.LandingAirport = a2.AirportId
                       inner join Airlines a3 on f.Airline = a3.AirlineId
                       WHERE Airline = " + airlineId).ToList();
            }

            return flights;
        }

        [HttpGet("get-flights")]
        public async Task<List<FlightModel>> GetFlights()
        {
            List<FlightModel> flights = new List<FlightModel>();

            using (var connection = GetOpenConnection())
            {
                flights = connection.Query<FlightModel>(
                    @"SELECT FlightId, FlightNumber, a1.AirportName as TakeOffAirportDescription, TakeOffDate, a2.AirportName as LandingAirportDescription, a3.AirlineName as AirlineDescription, LandingDate, Status, NumberOfPassengers, Price 
                       FROM Flights f inner join Airports a1 on f.TakeOffAirport = a1.AirportId 
                       inner join Airports a2 on f.LandingAirport = a2.AirportId
                       inner join Airlines a3 on f.Airline = a3.AirlineId").ToList();
            }

            return flights;
        }

        [HttpGet("get-flight/{flightId}")]
        public async Task<FlightModel> GetFlight(int? flightId)
        {
            FlightModel flight = new FlightModel();

            using (var connection = GetOpenConnection())
            {
                flight = connection.Query<FlightModel>(
                   @"SELECT FlightId, FlightNumber, TakeOffAirport, a1.AirportName as TakeOffAirportDescription, TakeOffDate, LandingAirport, a2.AirportName as LandingAirportDescription, Airline, a3.AirlineName as AirlineDescription, LandingDate, Status, NumberOfPassengers, Price 
                       FROM Flights f inner join Airports a1 on f.TakeOffAirport = a1.AirportId 
                       inner join Airports a2 on f.LandingAirport = a2.AirportId
                       inner join Airlines a3 on f.Airline = a3.AirlineId WHERE FlightId = " + flightId).FirstOrDefault();
            }

            return flight;
        }

        [HttpPost("add-flight")]
        public async Task PostAdd([FromBody] FlightModel flight)
        {
            string url = "https://localhost:44393/flights/add-flight/";
            try
            {
                using (var httpClient = new HttpClient())
                {
                    var stringContent = new StringContent(JsonConvert.SerializeObject(flight), Encoding.UTF8, "application/json");
                    using (var response = await httpClient.PostAsync(url, stringContent))
                    {
                        await response.Content.ReadAsStringAsync();
                    }
                }
            }
            catch (Exception e)
            {
                _logger.LogError("ERROR Adding flight to database: " + e.Message);
            }
        }

        [HttpPost("edit-flight")]
        public async Task PostEdit([FromBody] FlightModel flight)
        {
            string url = "https://localhost:44393/flights/edit-flight/";
            try
            {
                using (var httpClient = new HttpClient())
                {
                    var stringContent = new StringContent(JsonConvert.SerializeObject(flight), Encoding.UTF8, "application/json");
                    using (var response = await httpClient.PostAsync(url, stringContent))
                    {
                        await response.Content.ReadAsStringAsync();
                    }
                }
            }
            catch (Exception e)
            {
                _logger.LogError("ERROR Editing flight: " + e.Message);
            }
        }

        [HttpPost("delete-flight/{flightId}")]
        public async Task PostDelete(int? flightId)
        {
            string url = "https://localhost:44393/flights/delete-flight/" + flightId;
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
                _logger.LogError("ERROR Deleting flight to database: " + e.Message);
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
