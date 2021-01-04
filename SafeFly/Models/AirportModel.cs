using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClientService.Models
{
    public class AirportModel
    {
        public int AirportId { get; set; }
        public string AirportName { get; set; }
        public string AirportCode { get; set; }
        public string CountryName { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }
}
