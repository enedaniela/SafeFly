import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from "react-router-dom";
import Moment from 'react-moment';

export class AirportDetails extends Component {

    static displayName = AirportDetails.name;

    constructor(props) {
        super(props);
        this.state = {
            airport: {},
            takeOffFlights: [],
            landingFlights: []
        };
    }

    componentDidMount() {
        this.getAirport(this.props.location.state.payload);
    }

    async getAirport(airportId) {
        const response = await fetch(`airports/get-airport/${encodeURIComponent(airportId)}`);
        const data = await response.json();
        this.setState({
            airport: data,
            loading: false
        });

        const responseTakeOff = await fetch(`flights/takeOff/${encodeURIComponent(airportId)}`);
        const dataTakeOff = await responseTakeOff.json();
        this.setState({
            takeOffFlights: dataTakeOff,
            loading: false
        });

        const responseLanding = await fetch(`flights/landing/${encodeURIComponent(airportId)}`);
        const dataLanding = await responseLanding.json();
        this.setState({
            landingFlights: dataLanding,
            loading: false
        });
    }

    static renderAirport(airport) {
        return (
            <div>
                <dl className="row">
                    <dt class="col-sm-2">
                        Airport Name
                    </dt>
                    <dd class="col-sm-10">
                        {airport.airportName}
                    </dd>
                    <dt class="col-sm-2">
                        Airport Code
                    </dt>
                    <dd class="col-sm-10">
                        {airport.airportCode}
                    </dd>
                    <dt class="col-sm-2">
                        City
                    </dt>
                    <dd class="col-sm-10">
                        {airport.cityName}
                    </dd>
                    <dt class="col-sm-2">
                        Country
                    </dt>
                    <dd class="col-sm-10">
                        {airport.countryName}
                    </dd>
                </dl>
            </div>
        );
    }

    static renderFlights(flights, payload) {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Flight Number</th>
                        <th>Airline</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Number of passengers</th>
                        <th>Take Off Airport</th>
                        <th>Take Off Date</th>
                        <th>Landing Airport</th>
                        <th>Landing Date</th>                        
                    </tr>
                </thead>
                <tbody>
                    {flights.map((flight) => (
                        <tr>
                            <td>
                                <Link to={{
                                    pathname: "/flight-details",
                                    state: {
                                        flightId: flight.flightId,
                                        parentPage: "/airport-details",
                                        payload: payload
                                    }
                                }}
                                >
                                    {flight.flightNumber}
                                </Link>
                            </td>
                            <td>{flight.airlineDescription}</td>
                            <td>{flight.price}$</td>
                            <td>{flight.status}</td>
                            <td>{flight.numberOfPassengers}</td>
                            <td>{flight.takeOffAirportDescription}</td>
                            <td>
                                <Moment date={flight.takeOffDate} format="MM-DD-YYYY HH:mm:ss" />
                            </td>
                            <td>{flight.landingAirportDescription}</td>
                            <td>
                                <Moment date={flight.landingDate} format="MM-DD-YYYY HH:mm:ss" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }

    render() {
        let airport = AirportDetails.renderAirport(this.state.airport)
        let takeOffFlights = AirportDetails.renderFlights(this.state.takeOffFlights, this.state.airport.airportId);
        let landingFlights = AirportDetails.renderFlights(this.state.landingFlights, this.state.airport.airportId);

        return (
            <div>
                <h4>Airport Details</h4>
                <hr />
                <div className="airport">{airport}</div>
                <h4>Flights to take off</h4>
                <div className="takeOffFlights">{takeOffFlights}</div>
                <h4>Flights to land</h4>
                <div className="landingFlights">{landingFlights}</div>
                <Link to="/airports">
                    <Button color="primary">Back</Button>
                </Link>
            </div>
            );
    }
}