import React, { Component } from 'react';
import {DropdownButton, Dropdown, Button} from 'react-bootstrap';
import { Card, CardBody, CardText, CardTitle, CardFooter } from 'reactstrap';
import Moment from 'react-moment';

var DatePicker = require("reactstrap-date-picker");
var LandingDatePicker = require("reactstrap-date-picker");
export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = {
            airports: [], covid: {}, forecast: {}, flights: [], loading: true, externalInfo: false, flightsAvailable:false,
        takeOffAirport:{}, takeOffAirportDescription: "Origin", landingAirportDescription: "Destination", takeOffDate:new Date().toISOString(), landingDate:new Date().toISOString() };
        Home.renderSearchHeader = Home.renderSearchHeader.bind(this);
    }

    componentDidMount() {
        this.populateAirportsData();
    }

    async populateAirportsData() {
        const response = await fetch(`nomenclatoare/airports`);
        const data = await response.json();
        this.setState({ airports: data, loading: false });
    }

    static renderFlights(flights){
        return(
            <div>
                {flights.map((flight) => (
                                       
                
                <Card className="flightCard">
                    <CardBody>
                    <div className="row">
                        <div className="col-md-2">
                            <strong>Flight number</strong>
                        </div>
                        <div className="col-md-2">
                            <strong>Take Off Airport</strong>
                        </div>
                        <div className="col-md-2">
                            <strong>Take Off Date</strong>
                        </div>
                        <div className="col-md-2">
                            <strong>Landing Airport</strong>
                        </div>
                        <div className="col-md-2">
                            <strong>Landing Date</strong>
                        </div>
                        <div className="col-md-2">
                            <strong>Price</strong>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            {flight.flightNumber}
                        </div>
                        <div className="col-md-2">
                            {flight.takeOffAirportDescription}
                        </div>
                        <div className="col-md-2">
                            <Moment date={flight.takeOffDate} format="MM-DD-YYYY HH:mm:ss"/>
                        </div>
                        <div className="col-md-2">
                            {flight.landingAirportDescription}
                        </div>
                        <div className="col-md-2">                           
                            <Moment date={flight.landingDate} format="MM-DD-YYYY HH:mm:ss"/>
                        </div>
                        <div className="col-md-2">
                        {flight.price}$
                        </div>
                    </div>
                    </CardBody>
                </Card>
                ))}
            </div>
        );
    }

    static renderExternalInfo(covid, forecast){
        return(
            <div>
            <Card className="cardCovid">
            <CardBody>
            <div className="row">
                <div className="col-md-4">
                <img src="assets/coronavirus.png" alt="Covid" width="30" height="30"/>
                <strong> Covid Data for {covid.countryName}</strong>
                </div>
                <div className="col-md-2">
                    <div>Cases: {covid.cases}</div>
                </div>
                <div className="col-md-2">
                    <div>New Cases: {covid.newCases}</div>
                </div>
                <div className="col-md-2">
                    <div>Deaths: {covid.deaths}</div>
                </div>
                <div className="col-md-2">
                    <div>New Deaths: {covid.newCases}</div>
                </div> 
            </div>
            </CardBody>
            </Card>
            <Card className="cardWeather">
            <CardBody>
            
            <div className="row">
                <div className="col-md-4">
                <img src="assets/day-and-night.png" alt="Weather" width="30" height="30"/>
                <strong> Weather Data for {forecast.countryName} </strong>
                </div>
                <div className="col-md-2">
                <img className="weatherIcon" src={forecast.icon} alt="Weather" width="30" height="30"/>
                    {forecast.weatherMainDescription}
                </div>
                <div className="col-md-2">
                    <img src="assets/temperature.png" alt="Sunrise" width="30" height="30"/>
                    {forecast.temperature} &#8451;
                </div>
                <div className="col-md-2">
                    <img src="assets/sunrise.png" alt="Sunrise" width="30" height="30"/>
                    <Moment date={forecast.sunrise} format="hh:mm"/>
                </div>
                <div className="col-md-2">
                    <img src="assets/sunset.png" alt="Sunset" width="30" height="30"/>
                    <Moment date={forecast.sunset} format="hh:mm"/>
                </div> 
            </div>
            </CardBody>
            </Card>
            </div>
        );
    }

    static renderSearchHeader(airports){

        return (
            <div className="backgroundColor">
            <div className="row">
            <div className="col-md-3">
                <div className="smallHeader">Din</div>
            </div>
            <div className="col-md-3">
                <div className="smallHeader">Catre</div>
            </div>
            <div className="col-md-2">
                <div className="smallHeader">Plecare</div>
            </div>
            <div className="col-md-2">
                <div className="smallHeader">Intoarcere</div>
            </div>
            </div>
            <div className="row">
            <div className="col-md-3">
            <DropdownButton className="" id="dropdown-button-origin" title={this.state.takeOffAirportDescription} onSelect={this.handleSelectTakeOffAirport.bind(this)}>
            {airports.map((option) => (
                <Dropdown.Item eventKey={option.airportId} value={option.airportCode}>{option.airportName} ({option.airportCode})</Dropdown.Item>                           
                ))}
            </DropdownButton>
            </div>
            <div className="col-md-3">
                        <DropdownButton className="" id="dropdown-button-destination" title={this.state.landingAirportDescription} onSelect={this.handleSelectLandingAirport.bind(this)}>
            {airports.map((option) => (
                <Dropdown.Item eventKey={option.airportId} value={option.airportCode}>{option.airportName} ({option.airportCode})</Dropdown.Item>                           
            ))}
            </DropdownButton>
            </div>
            <div className="col-md-2">
                        <DatePicker value   = {this.state.takeOffDate} 
                    onChange= {(v,f) => this.handleSelectTakeOffDate(v, f)}  id = "datepicker-startDate"/>
            </div>
            <div className="col-md-2">
                <LandingDatePicker value   = {this.state.landingDate} 
                    onChange= {(v,f) => this.handleSelectLandingDate(v, f)} id = "datepicker-endDate"/>
            </div>
            <div className="col-md-2">
            <div className="smallHeader">
            </div>
            <Button variant="info" onClick={() => {
              this.searchFlights()}}>Search flights</Button>{' '}  
            </div>
            </div>           
        </div>
        );
    }

    handleSelectTakeOffAirport(eventKey, event) {
        var takeOffAirport = this.state.airports.find(a => a.airportId == eventKey);
        this.setState({takeOffAirport: takeOffAirport, takeOffAirportDescription:takeOffAirport.airportName + "(" + takeOffAirport.airportCode + ")"});
    }
    handleSelectLandingAirport(eventKey, event) {
        var landingAirport = this.state.airports.find(a => a.airportId == eventKey);
        this.setState({ landingAirport: landingAirport, landingAirportDescription: landingAirport.airportName + "(" + landingAirport.airportCode + ")"} );
    }

    handleSelectTakeOffDate(value, formattedValue) {
        this.setState({
          takeOffDate: value,
          formattedValueTakeOffDate: formattedValue 
        })
      }
    handleSelectLandingDate(value, formattedValue) {
        this.setState({
          landingDate: value,
          formattedValueLandingDate: formattedValue
        })
      }

    searchFlights() {
        this.populateCovidData();
        this.populateWeatherData();
        this.populateFlightsData();
        console.log(this.state);
    }

    async populateCovidData() {
        const airportId = this.state.landingAirport.airportId;
        const response = await fetch(`externalService/covid/${encodeURIComponent(airportId)}`);
        const data = await response.json();
        this.setState({ covid: data, externalInfo: true });
    }

    async populateWeatherData() {
        const airportId = this.state.landingAirport.airportId;
        const response = await fetch(`externalService/weather/${encodeURIComponent(airportId)}`);
        const data = await response.json();
        this.setState({ forecast: data, externalInfo: true });
    }

    async populateFlightsData() {
        const landingAirport = this.state.landingAirport.airportId;
        const takeOffAirport = this.state.takeOffAirport.airportId;
        const takeOffDate = this.state.takeOffDate;
        const landingDate = this.state.landingDate;
        //TODO: Add dates
        const response = await fetch(`flights/${encodeURIComponent(takeOffAirport)}/${encodeURIComponent(landingAirport)}/${encodeURIComponent(takeOffDate)}/${encodeURIComponent(landingDate)}`);
        const data = await response.json();
        if(data.length != 0)
            this.setState({ flights: data, flightsAvailable: true });
        else
        this.setState({ flights: data, flightsAvailable: false });
    }

    render() {

        let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Home.renderSearchHeader(this.state.airports);

      let externalInfo = this.state.externalInfo ? Home.renderExternalInfo(this.state.covid, this.state.forecast) : null;

      let flights = this.state.flightsAvailable ? Home.renderFlights(this.state.flights) : null;
    return (
        <div>
        <div className="backgroundImage">
            <div className="headerContent">
                <h1 id="tabelLabel" >Sa inceapa calatoria!</h1>
                <p>Alegeti destinatia si perioada de calatorie dorite, iar noi ne vom ocupa de restul.</p>
                {contents}
            </div>
      </div>
      <div  className="externalInfo">{externalInfo}</div>
      <div>{flights}</div>
      </div>
    );
  }
}
