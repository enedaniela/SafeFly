import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export class DeleteAirline extends Component {

    static displayName = DeleteAirline.name;

    constructor(props) {
        super(props);
        this.state = {
            airline: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this)
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
    }

    async handleSubmit(event) {

        const requestOptions = {
            method: 'POST'
        };

        await fetch(`airlines/delete-airline/${encodeURIComponent(this.state.airline.airlineId)}`, requestOptions);
        this.props.history.push('/airlines');
    }

    render() {
        return (
            <div>
                <h3>Are you sure you want to delete this?</h3>
                <div>
                    <h4>Airline</h4>
                    <hr />
                    <dl className="row">
                        <dt class="col-sm-2">
                            Airline Name
                        </dt>
                        <dd class="col-sm-10">
                            {this.state.airline.airlineName}
                        </dd>
                        <dt class="col-sm-2">
                            Airline Code
                        </dt>
                        <dd class="col-sm-10">
                            {this.state.airline.airlineCode}
                        </dd>                        
                        <dt class="col-sm-2">
                            Country
                        </dt>
                        <dd class="col-sm-10">
                            {this.state.airline.countryName}
                        </dd>
                    </dl>
                </div>
                <div className="row">
                    <div className="col-sm-1">
                        <Button color="danger" onClick={this.handleSubmit}>Delete</Button>
                    </div>
                    <div className="col-sm-1">
                        <Link to="/airlines">
                            <Button color="primary">Back</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}