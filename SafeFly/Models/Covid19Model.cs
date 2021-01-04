using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClientService.Models
{
    public class Covid19Model
    {
        public string CountryName { get; set; }
        public string Continent { get; set; }
        public int Cases { get; set; }
        public int NewCases { get; set; }
        public int Deaths { get; set; }
        public int NewDeaths { get; set; }
        public int Recoverd { get; set; }
        public int Tests { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public DateTime Updated { get; set; }
    }
}
