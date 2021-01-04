using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ReservationService.ViewModels
{
    // Root myDeserializedClass = JsonSerializer.Deserialize<Root>(myJsonResponse);
    public class Parameters
    {
        [JsonPropertyName("country")]
        public string Country { get; set; }
    }

    public class Cases
    {
        [JsonPropertyName("new")]
        public string New { get; set; }

        [JsonPropertyName("active")]
        public int Active { get; set; }

        [JsonPropertyName("critical")]
        public int Critical { get; set; }

        [JsonPropertyName("recovered")]
        public int Recovered { get; set; }

        [JsonPropertyName("1M_pop")]
        public string _1MPop { get; set; }

        [JsonPropertyName("total")]
        public int Total { get; set; }
    }

    public class Deaths
    {
        [JsonPropertyName("new")]
        public string New { get; set; }

        [JsonPropertyName("1M_pop")]
        public string _1MPop { get; set; }

        [JsonPropertyName("total")]
        public int Total { get; set; }
    }

    public class Tests
    {
        [JsonPropertyName("1M_pop")]
        public string _1MPop { get; set; }

        [JsonPropertyName("total")]
        public int Total { get; set; }
    }

    public class Response
    {
        [JsonPropertyName("continent")]
        public string Continent { get; set; }

        [JsonPropertyName("country")]
        public string Country { get; set; }

        [JsonPropertyName("population")]
        public int Population { get; set; }

        [JsonPropertyName("cases")]
        public Cases Cases { get; set; }

        [JsonPropertyName("deaths")]
        public Deaths Deaths { get; set; }

        [JsonPropertyName("tests")]
        public Tests Tests { get; set; }

        [JsonPropertyName("day")]
        public string Day { get; set; }

        [JsonPropertyName("time")]
        public DateTime Time { get; set; }
    }

    public class Covid19ViewModel
    {
        [JsonPropertyName("get")]
        public string Get { get; set; }

        [JsonPropertyName("parameters")]
        public Parameters Parameters { get; set; }

        [JsonPropertyName("errors")]
        public List<object> Errors { get; set; }

        [JsonPropertyName("results")]
        public int Results { get; set; }

        [JsonPropertyName("response")]
        public List<Response> Response { get; set; }
    }


}
