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
    }

    componentDidMount() {
        this.populateAirportsData();
    }

    async populateAirportsData() {
        const response = await fetch(`nomenclatoare/airports`);
        const data = await response.json();
        this.setState({ airports: data, loading: false });
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
                                <div className="col-md-1" />
                                    <Link to={{
                                        pathname: "/airports-delete",
                                        state: {
                                            airportId: airport.airportId
                                        }
                                    }}
                                    >
                                        <Button color="danger">Delete</Button>
                                    </Link>
                                    <div>
                                        
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