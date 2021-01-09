import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from "react-router-dom";
import Moment from 'react-moment';

export class FlightDetails extends Component {

    static displayName = FlightDetails.name;

    constructor(props) {
        super(props);
        this.state = {
            flight: {},
            parentPage: "",
            payload: ""
        };
    }

    componentDidMount() {
        this.getFlight(this.props.location.state);
    }

    async getFlight(state) {
        const response = await fetch(`flights/get-flight/${encodeURIComponent(state.flightId)}`);
        const data = await response.json();
        this.setState({
            flight: data, 
            parentPage: state.parentPage,
            payload: state.payload,
            loading: false
        });
        console.log(state);
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <h4>Flight Details</h4>
                <hr />
                <div>
                    <dl className="row">
                        <dt class="col-sm-2">
                            Flight Number
                        </dt>
                        <dd class="col-sm-10">
                            {this.state.flight.flightNumber}
                        </dd>
                        <dt class="col-sm-2">
                            Airline
                        </dt>
                        <dd class="col-sm-10">
                            {this.state.flight.airlineDescription}
                        </dd>
                        <dt class="col-sm-2">
                            Price
                        </dt>
                            <dd class="col-sm-10">
                            {this.state.flight.price}$
                            </dd>
                        <dt class="col-sm-2">
                            Status
                        </dt>
                        <dd class="col-sm-10">
                            {this.state.flight.status}
                        </dd>
                        <dt class="col-sm-2">
                            Number of Passengers
                        </dt>
                        <dd class="col-sm-10">
                            {this.state.flight.numberOfPassengers}
                        </dd>
                        <dt class="col-sm-2">
                            Take Off Airport
                        </dt>
                        <dd class="col-sm-10">
                            {this.state.flight.takeOffAirportDescription}
                        </dd>
                        <dt class="col-sm-2">
                            Take Off Date
                        </dt>
                        <dd class="col-sm-10">
                            <Moment date={this.state.flight.takeOffDate} format="MM-DD-YYYY HH:mm:ss" />
                        </dd>
                        <dt class="col-sm-2">
                            Landing Airport
                        </dt>
                        <dd class="col-sm-10">
                            {this.state.flight.landingAirportDescription}
                        </dd>
                        <dt class="col-sm-2">
                            Landing Date
                        </dt>
                        <dd class="col-sm-10">
                            <Moment date={this.state.flight.landingDate} format="MM-DD-YYYY HH:mm:ss" />
                        </dd>
                    </dl>
                </div>
                <Link to={{
                        pathname: this.state.parentPage,
                        state: {
                            payload: this.state.payload
                        }
                    }}
                    > 
                    <Button color="primary">Back</Button>
                </Link>
            </div>
        );
    }
}