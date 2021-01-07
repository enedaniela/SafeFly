import React, { Component } from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import { Link } from "react-router-dom";

export class Airports extends Component {

    static displayName = Airports.name;

    constructor(props) {
        super(props);
        this.state = {
            airports: [],
        };

        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        this.populateAirportsData();
    }

    componentDidUpdate() {
        this.componentDidMount();
    }

    async populateAirportsData() {
        const response = await fetch(`nomenclatoare/airports`);
        const data = await response.json();
        this.setState({ airports: data, loading: false });
    }

    async handleDelete(airportId) {
        const requestOptions = {
            method: 'POST'
        };
        await fetch(`nomenclatoare/airports/delete-airport/${encodeURIComponent(airportId)}`, requestOptions);
    }

    render() {
        return (
            <div>
                <CardBody>
                    <div className="row">
                        <div className="col-md-2">
                            <strong>Airport</strong>
                        </div>
                        <div className="col-md-2">
                            <strong>Code</strong>
                        </div>
                        <div className="col-md-2">
                            <strong>Country</strong>
                        </div>
                    </div>
                </CardBody>
                {this.state.airports.map((airport) => (
                    <div>
                    <Card className="airportCard">
                        <CardBody>                            
                            <div className="row">
                                <div className="col-md-2">
                                    {airport.airportName}
                                </div>
                                <div className="col-md-2">
                                    {airport.airportCode}
                                </div>
                                <div className="col-md-2">
                                    {airport.countryName}
                                </div>
                                <div>
                                    <Link to={{
                                        pathname: "/airports-details",
                                        state: {
                                            airportId: airport.airportId
                                        }
                                    }}
                                    >
                                        <Button color="info">Details</Button>
                                    </Link>
                                </div>
                                <div className="col-md-1"/>
                                <div>
                                        <Link to={{
                                            pathname: "/airports-edit",
                                            state: {
                                                airportId: airport.airportId 
                                                  }
                                                }}
                                            > 
                                        <Button color="primary">Edit</Button>
                                    </Link>
                                </div>
                                <div className="col-md-1"/>
                                    <div>
                                        <Button color="danger" onClick={() => this.handleDelete(airport.airportId)}>Delete</Button>
                                </div>
                            </div>
                        </CardBody>
                        </Card>
                        <div className="row-md-4">
                            <div className="emptyRow"></div>
                        </div>
                    </div>
                    
                ))}
                <CardBody>
                    <Link to="/airports-add">            
                            <Button color="primary">Add airport</Button>  
                    </Link>                         
                </CardBody>                
            </div>
        );
    }

}