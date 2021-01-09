using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationService.Models
{
    public class FlightModel
    {
        public int FlightId { get; set; }
        public string FlightNumber { get; set; }
        public int TakeOffAirport { get; set; }
        public string TakeOffAirportDescription { get; set; }
        public int LandingAirport { get; set; }
        public string LandingAirportDescription { get; set; }
        public DateTime TakeOffDate { get; set; }
        public DateTime LandingDate { get; set; }
        public string Status { get; set; }
        public int Airline { get; set; }
        public string AirlineDescription { get; set; }
        public int NumberOfPassengers { get; set; }
        public int Price { get; set; }
    }
}
