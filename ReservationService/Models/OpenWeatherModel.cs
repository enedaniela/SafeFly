using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationService.Models
{
    public class OpenWeatherModel
    {
        public string CountryName { get; set; }
        public DateTime Sunset { get; set; }
        public DateTime Sunrise { get; set; }
        public double Temperature { get; set; }
        public string WeatherMainDescription { get; set; }
        public string Icon { get; set; }
        public DateTime Updated { get; set; }
    }
}
