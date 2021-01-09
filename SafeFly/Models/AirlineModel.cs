using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClientService.Models
{
    public class AirlineModel
    {
        public int AirlineId { get; set; }
        public string AirlineName { get; set; }
        public string AirlineCode { get; set; }
        public string CountryName { get; set; }
    }
}
