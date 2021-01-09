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
    public class AirportsController : ControllerBase
    {    

        [HttpPost("add-airport")]
        public async Task Post([FromBody] AirportModel airport)
        {
            using (var connection = GetOpenConnection())
            {
                string query = "INSERT INTO Airports (AirportName, AirportCode, CityName, CountryName, Latitude, Longitude) " +
                    "VALUES(@AirportName, @AirportCode, @CityName, @CountryName, @Latitude, @Longitude)";
                SqlCommand cmd = new SqlCommand(query, (SqlConnection)connection);

                cmd.Parameters.AddWithValue("@AirportName", airport.AirportName);
                cmd.Parameters.AddWithValue("@AirportCode", airport.AirportCode);
                cmd.Parameters.AddWithValue("@CityName", airport.CityName);
                cmd.Parameters.AddWithValue("@CountryName", airport.CountryName);
                cmd.Parameters.AddWithValue("@Latitude", airport.Latitude);
                cmd.Parameters.AddWithValue("@Longitude", airport.Longitude);
                cmd.ExecuteNonQuery();
            }
        }

        [HttpPost("edit-airport")]
        public async Task PostEdit([FromBody] AirportModel airport)
        {
            using (var connection = GetOpenConnection())
            {
                string query = "UPDATE Airports " +
                    "SET AirportName = @AirportName, AirportCode = @AirportCode, CityName = @CityName, CountryName = @CountryName, Latitude = @Latitude, Longitude = @Longitude " +
                    "WHERE AirportId = @AirportId";
                SqlCommand cmd = new SqlCommand(query, (SqlConnection)connection);

                cmd.Parameters.AddWithValue("@AirportId", airport.AirportId);
                cmd.Parameters.AddWithValue("@AirportName", airport.AirportName);
                cmd.Parameters.AddWithValue("@AirportCode", airport.AirportCode);
                cmd.Parameters.AddWithValue("@CityName", airport.CityName);
                cmd.Parameters.AddWithValue("@CountryName", airport.CountryName);
                cmd.Parameters.AddWithValue("@Latitude", airport.Latitude);
                cmd.Parameters.AddWithValue("@Longitude", airport.Longitude);
                cmd.ExecuteNonQuery();
            }
        }

        [HttpPost("delete-airport/{airportId}")]
        public async Task PostDelete(int airportId)
        {
            using (var connection = GetOpenConnection())
            {
                string query = "DELETE FROM Airports WHERE AirportId = @AirportId";
                SqlCommand cmd = new SqlCommand(query, (SqlConnection)connection);

                cmd.Parameters.AddWithValue("@AirportId", airportId);
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
