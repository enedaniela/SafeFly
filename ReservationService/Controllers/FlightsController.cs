using ReservationService.Models;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace ReservationService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FlightsController : ControllerBase
    {
        [HttpPost("add-flight")]
        public async Task PostAdd([FromBody] FlightModel flight)
        {
            using (var connection = GetOpenConnection())
            {
                string query = "INSERT INTO Flights (FlightNumber, Airline, Price, Status, NumberOfPassengers," +
                    "TakeOffAirport, TakeOffDate, LandingAirport, LandingDate) " +
                    "VALUES(@FlightNumber, @Airline, @Price, @Status, @NumberOfPassengers, @TakeOffAirport," +
                    "@TakeOffDate, @LandingAirport, @LandingDate)";
                SqlCommand cmd = new SqlCommand(query, (SqlConnection)connection);

                cmd.Parameters.AddWithValue("@FlightNumber", flight.FlightNumber);
                cmd.Parameters.AddWithValue("@Airline", flight.Airline);
                cmd.Parameters.AddWithValue("@Price", flight.Price);
                cmd.Parameters.AddWithValue("@Status", flight.Status);
                cmd.Parameters.AddWithValue("@NumberOfPassengers", flight.NumberOfPassengers);
                cmd.Parameters.AddWithValue("@TakeOffAirport", flight.TakeOffAirport);
                cmd.Parameters.AddWithValue("@TakeOffDate", flight.TakeOffDate);
                cmd.Parameters.AddWithValue("@LandingAirport", flight.LandingAirport);
                cmd.Parameters.AddWithValue("@LandingDate", flight.LandingDate);
                cmd.ExecuteNonQuery();
            }
        }

        [HttpPost("edit-flight")]
        public async Task PostEdit([FromBody] FlightModel flight)
        {
            using (var connection = GetOpenConnection())
            {
                string query = "UPDATE Flights " +
                    "SET FlightNumber = @FlightNumber, Airline = @Airline, Price = @Price, Status = @Status, NumberOfPassengers = @NumberOfPassengers, " +
                    "TakeOffAirport = @TakeOffAirport, TakeOffDate = @TakeOffDate, LandingAirport = @LandingAirport, LandingDate = @LandingDate " +
                    "WHERE FlightId = @FlightId";
                SqlCommand cmd = new SqlCommand(query, (SqlConnection)connection);

                cmd.Parameters.AddWithValue("@FlightId", flight.FlightId);
                cmd.Parameters.AddWithValue("@FlightNumber", flight.FlightNumber);
                cmd.Parameters.AddWithValue("@Airline", flight.Airline);
                cmd.Parameters.AddWithValue("@Price", flight.Price);
                cmd.Parameters.AddWithValue("@Status", flight.Status);
                cmd.Parameters.AddWithValue("@NumberOfPassengers", flight.NumberOfPassengers);
                cmd.Parameters.AddWithValue("@TakeOffAirport", flight.TakeOffAirport);
                cmd.Parameters.AddWithValue("@TakeOffDate", flight.TakeOffDate);
                cmd.Parameters.AddWithValue("@LandingAirport", flight.LandingAirport);
                cmd.Parameters.AddWithValue("@LandingDate", flight.LandingDate);
                cmd.ExecuteNonQuery();
            }
        }

        [HttpPost("delete-flight/{flightId}")]
        public async Task PostDelete(int flightId)
        {
            using (var connection = GetOpenConnection())
            {
                string query = "DELETE FROM Flights WHERE FlightId = @FlightId";
                SqlCommand cmd = new SqlCommand(query, (SqlConnection)connection);

                cmd.Parameters.AddWithValue("@FlightId", flightId);
                cmd.ExecuteNonQuery();
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
