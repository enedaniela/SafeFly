using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClientService.Models
{
    public class FlightModels
    {
        public int FlightId { get; set; }
        public string FlightNumber { get; set; }
        public int TakeOffAirport { get; set; }
        public string TakeOffAirportDescription { get; set; }
        public int LandingAirport { get; set; }
        public string LandingAirportDescription { get; set; }
        public DateTime TakeOffDate { get; set; }
        public DateTime LandingDate { get; set; }
        public int Price { get; set; }
    }
}
