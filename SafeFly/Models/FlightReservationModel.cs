using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClientService.Models
{
    public class FlightReservationModel
    {
        public int FlightReservationId { get; set; }
        public int User { get; set; }
        public int Flight { get; set; }
        public int NumberOfPassengers { get; set; }
    }
}
