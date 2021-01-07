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
using System.Data;

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

        [HttpGet("airports/{airportId}")]
        public async Task<AirportModel> Get(int airportId)
        {
            AirportModel airport = new AirportModel();
            using (var connection = GetOpenConnection())
            {
                airport = connection.Query<AirportModel>(
                     @"select AirportId, AirportName, CountryName, AirportCode, Latitude, Longitude
                        from Airports where AirportId = " + airportId).FirstOrDefault();
            }

            return airport;
        }

        [HttpPost("airports/add-airport")]
        public async Task Post([FromBody] AirportModel airport)
        {
            using (var connection = GetOpenConnection())
            {
                string query = "INSERT INTO Airports (AirportName, AirportCode, CountryName, Latitude, Longitude) " +
                    "VALUES(@AirportName, @AirportCode, @CountryName, @Latitude, @Longitude)";
                SqlCommand cmd = new SqlCommand(query, (SqlConnection) connection);

                //Pass values to Parameters
                cmd.Parameters.AddWithValue("@AirportName", airport.AirportName);
                cmd.Parameters.AddWithValue("@AirportCode", airport.AirportCode);
                cmd.Parameters.AddWithValue("@CountryName", airport.CountryName);
                cmd.Parameters.AddWithValue("@Latitude", airport.Latitude);
                cmd.Parameters.AddWithValue("@Longitude", airport.Longitude);
                cmd.ExecuteNonQuery();
            }
        }

        [HttpPost("airports/delete-airport/{airportId}")]
        public async Task PostDelete(int airportId)
        {
            using (var connection = GetOpenConnection())
            {
                string query = "DELETE FROM Airports WHERE AirportId = @AirportId";
                SqlCommand cmd = new SqlCommand(query, (SqlConnection) connection);

                cmd.Parameters.AddWithValue("@AirportId", airportId);
                cmd.ExecuteNonQuery();
            }
        }

        [HttpPost("airports/edit-airport")]
        public async Task PostEdit([FromBody] AirportModel airport)
        {
            using (var connection = GetOpenConnection())
            {
                string query = "UPDATE Airports " +
                    "SET AirportName = @AirportName, AirportCode = @AirportCode, CountryName = @CountryName, Latitude = @Latitude, Longitude = @Longitude " +
                    "WHERE AirportId = @AirportId";
                SqlCommand cmd = new SqlCommand(query, (SqlConnection)connection);

                //Pass values to Parameters
                cmd.Parameters.AddWithValue("@AirportId", airport.AirportId);
                cmd.Parameters.AddWithValue("@AirportName", airport.AirportName);
                cmd.Parameters.AddWithValue("@AirportCode", airport.AirportCode);
                cmd.Parameters.AddWithValue("@CountryName", airport.CountryName);
                cmd.Parameters.AddWithValue("@Latitude", airport.Latitude);
                cmd.Parameters.AddWithValue("@Longitude", airport.Longitude);
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
