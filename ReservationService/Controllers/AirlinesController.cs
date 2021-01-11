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
    public class AirlinesController : ControllerBase
    {
        [HttpPost("add-airline")]
        public async Task Post([FromBody] AirlineModel airline)
        {
            using (var connection = GetOpenConnection())
            {
                string query = "INSERT INTO Airlines (AirlineName, AirlineCode, CountryName) " +
                    "VALUES(@AirlineName, @AirlineCode, @CountryName)";
                SqlCommand cmd = new SqlCommand(query, (SqlConnection)connection);

                cmd.Parameters.AddWithValue("@AirlineName", airline.AirlineName);
                cmd.Parameters.AddWithValue("@AirlineCode", airline.AirlineCode);
                cmd.Parameters.AddWithValue("@CountryName", airline.CountryName);
                cmd.ExecuteNonQuery();
            }
        }

        [HttpPost("edit-airline")]
        public async Task PostEdit([FromBody] AirlineModel airline)
        {
            using (var connection = GetOpenConnection())
            {
                string query = "UPDATE Airlines " +
                    "SET AirlineName = @AirlineName, AirlineCode = @AirlineCode, CountryName = @CountryName " +
                    "WHERE AirlineId = @AirlineId";
                SqlCommand cmd = new SqlCommand(query, (SqlConnection)connection);

                cmd.Parameters.AddWithValue("@AirlineId", airline.AirlineId);
                cmd.Parameters.AddWithValue("@AirlineName", airline.AirlineName);
                cmd.Parameters.AddWithValue("@AirlineCode", airline.AirlineCode);
                cmd.Parameters.AddWithValue("@CountryName", airline.CountryName);
                cmd.ExecuteNonQuery();
            }
        }

        [HttpPost("delete-airline/{airlineId}")]
        public async Task PostDelete(int airlineId)
        {
            using (var connection = GetOpenConnection())
            {
                string query = "DELETE FROM Airlines WHERE AirlineId = @AirlineId";
                SqlCommand cmd = new SqlCommand(query, (SqlConnection)connection);

                cmd.Parameters.AddWithValue("@AirlineId", airlineId);
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
