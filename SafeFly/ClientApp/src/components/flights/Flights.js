import React, { Component } from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import { Link } from "react-router-dom";

export class Flights extends Component {

    static displayName = Flights.name;

    constructor(props) {
        super(props);
        this.state = {
            flights: [],
        };
    }

    componentDidMount() {
        this.populateFlightsData();
    }

    async populateFlightsData() {
        const response = await fetch(`flights/get-flights`);
        const data = await response.json();
        this.setState({ flights: data, loading: false });
    }

    render() {
        return (
            <div>
                <CardBody>
                    <div className="row">
                        <div className="col-sm-2">
                            <strong>Flight Number</strong>
                        </div>
                        <div className="col-sm-2">
                            <strong>Airline</strong>
                        </div>
                        <div className="col-sm-2">
                            <strong>Take off Airport</strong>
                        </div>
                        <div className="col-sm-2">
                            <strong>Landing Airport</strong>
                        </div>
                    </div>
                </CardBody>
                {this.state.flights.map((flight) => (
                    <div >
                        <Card className="flightCard">
                            <CardBody>
                                <div className="row">
                                    <div className="col-sm-2">
                                        {flight.flightNumber}
                                    </div>
                                    <div className="col-sm-2">
                                        {flight.airlineDescription}
                                    </div>
                                    <div className="col-sm-2">
                                        {flight.takeOffAirportDescription}
                                    </div>
                                    <div className="col-sm-2">
                                        {flight.landingAirportDescription}
                                    </div>
                                    <div className="col">
                                        <Link to={{
                                            pathname: "/flight-details",
                                            state: {
                                                flightId: flight.flightId,
                                                parentPage: "/flights"
                                            }
                                        }}
                                        >
                                            <Button color="info">Details</Button>
                                        </Link>
                                    </div>
                                    <div className="col" />
                                    <div>
                                        <Link to={{
                                            pathname: "/flight-edit",
                                            state: {
                                                flightId: flight.flightId,
                                                parentPage: "/flights"
                                            }
                                        }}
                                        >
                                            <Button color="primary">Edit</Button>
                                        </Link>
                                    </div>
                                    <div className="col" />
                                    <Link to={{
                                        pathname: "/flight-delete",
                                        state: {
                                            flightId: flight.flightId,
                                            parentPage: "/flights"
                                        }
                                    }}
                                    >
                                        <Button color="danger">Delete</Button>
                                    </Link>
                                    <div className="emptyCol"></div>
                                </div>                                
                            </CardBody>
                        </Card>
                        <div className="row-md-4">
                            <div className="emptyRow"></div>
                        </div>
                    </div>

                ))}
                <CardBody>
                    <Link to="/flight-add">
                        <Button color="primary">Add flight</Button>
                    </Link>
                </CardBody>
            </div>
        );
    }
}