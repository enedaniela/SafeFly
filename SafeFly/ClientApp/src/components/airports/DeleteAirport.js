import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export class DeleteAirport extends Component {

    static displayName = DeleteAirport.name;

    constructor(props) {
        super(props);
        this.state = {
            airport: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this)
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
    }

    async handleSubmit(event) {

        const requestOptions = {
            method: 'POST'
        };

        await fetch(`airports/delete-airport/${encodeURIComponent(this.state.airport.airportId)}`, requestOptions);
        this.props.history.push('/airports');
    }

    render() {
        return (
            <div>
                <h3>Are you sure you want to delete this?</h3>
                <div>
                    <h4>Airport</h4>
                    <hr />
                    <dl className="row">
                        <dt class="col-sm-2">
                            Airport Name
                        </dt>
                        <dd class="col-sm-10">
                            {this.state.airport.airportName}
                        </dd>
                        <dt class="col-sm-2">
                            Airport Code
                        </dt>
                        <dd class="col-sm-10">
                            {this.state.airport.airportCode}
                        </dd>
                        <dt class="col-sm-2">
                            City
                        </dt>
                        <dd class="col-sm-10">
                            {this.state.airport.cityName}
                        </dd>
                        <dt class="col-sm-2">
                            Country
                        </dt>
                        <dd class="col-sm-10">
                            {this.state.airport.countryName}
                        </dd>
                    </dl>
                </div>
                <div className="row">
                    <div className="col-sm-1">
                        <Button color="danger" onClick={this.handleSubmit}>Delete</Button>
                    </div>
                    <div className="col-sm-1">
                        <Link to="/airports">
                            <Button color="primary">Back</Button>
                        </Link>
                    </div>
                </div>
            </div>
            );
    }
}