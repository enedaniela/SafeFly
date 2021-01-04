using Microsoft.AspNetCore.Mvc;
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
            return new List<string> { "Reservation Service has started!"};
        }
    }
}
