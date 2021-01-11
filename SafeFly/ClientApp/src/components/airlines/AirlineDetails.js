import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from "react-router-dom";
import Moment from 'react-moment';

export class AirlineDetails extends Component {

    static displayName = AirlineDetails.name;

    constructor(props) {
        super(props);
        this.state = {
            airline: {},
            flights: []
        };
    }

    componentDidMount() {
        this.getAirline(this.props.location.state.payload);
    }

    async getAirline(airlineId) {
        const response = await fetch(`airlines/get-airline/${encodeURIComponent(airlineId)}`);
        const data = await response.json();
        this.setState({
            airline: data,
            loading: false
        });

        const responseFlights = await fetch(`flights/get-from-airline/${encodeURIComponent(airlineId)}`);
        const dataFlights = await responseFlights.json();
        this.setState({
            flights: dataFlights,
            loading: false
        });
    }

    static renderAirline(airline) {
        return (
            <div>
                <dl className="row">
                    <dt class="col-sm-2">
                        Airline Name
                    </dt>
                    <dd class="col-sm-10">
                        {airline.airlineName}
                    </dd>
                    <dt class="col-sm-2">
                        Airline Code
                    </dt>
                    <dd class="col-sm-10">
                        {airline.airlineCode}
                    </dd>
                    <dt class="col-sm-2">
                        Country
                    </dt>
                    <dd class="col-sm-10">
                        {airline.countryName}
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
                            <Link to={{
                                pathname: "/flight-details",
                                state: {
                                    flightId: flight.flightId,
                                    parentPage: "/airline-details",
                                    payload: payload
                                }
                            }}
                            >
                                {flight.flightNumber}
                            </Link>
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
        let airline = AirlineDetails.renderAirline(this.state.airline)
        let flights = AirlineDetails.renderFlights(this.state.flights, this.state.airline.airlineId);

        return (
            <div>
                <h4>Airline Details</h4>
                <hr />
                <div className="airline">{airline}</div>
                <h4>Flights</h4>
                <div className="flights">{flights}</div>               
                <Link to="/airlines">
                    <Button color="primary">Back</Button>
                </Link>
            </div>
        );
    }
}