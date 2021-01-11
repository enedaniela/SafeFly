using Microsoft.AspNetCore.Mvc;
using ReservationService.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationService.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public List<string> Get()
        {
            //Exemplu de trimitere de mail
            EmailHelper.SendEmail("danielaene84@gmail.com", "Safefly Notification", "You flight X1234 has been canceled. Go to SafeFly app to book another flight");
            return new List<string> { "Reservation Service has started!"};
            
        }
    }
}
