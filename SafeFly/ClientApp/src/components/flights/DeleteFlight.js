import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export class DeleteFlight extends Component {

    static displayName = DeleteFlight.name;

    constructor(props) {
        super(props);
        this.state = {
            flight: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const { flightId } = this.props.location.state;
        this.getFlight(flightId);
    }

    async getFlight(flightId) {
        const response = await fetch(`flights/get-flight/${encodeURIComponent(flightId)}`);
        const data = await response.json();
        this.setState({
            flight: data,
            loading: false
        });
    }

    async handleSubmit(event) {

        const requestOptions = {
            method: 'POST'
        };

        await fetch(`flights/delete-flight/${encodeURIComponent(this.state.flight.flightId)}`, requestOptions);
        this.props.history.push('/flights');
    }

    render() {
        return (
            <div>
                <h3>Are you sure you want to delete this?</h3>
                <div>
                    <h4>Flight</h4>
                    <hr />
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
                            Take off Airport
                        </dt>
                        <dd class="col-sm-10">
                            {this.state.flight.takeOffAirportDescription}
                        </dd>
                        <dt class="col-sm-2">
                            Landing Airport
                        </dt>
                        <dd class="col-sm-10">
                            {this.state.flight.landingAirportDescription}
                        </dd>
                    </dl>
                </div>
                <div className="row">
                    <div className="col-sm-1">
                        <Button color="danger" onClick={this.handleSubmit}>Delete</Button>
                    </div>
                    <div className="col-sm-1">
                        <Link to="/flights">
                            <Button color="primary">Back</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}