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
        const response = await fetch(`airports/get-airports`);
        const data = await response.json();
        this.setState({ airports: data, loading: false });
    }

    render() {
        return (
            <div>
                <CardBody>
                    <div className="row">
                        <div className="col-sm-2">
                            <strong>Airport</strong>
                        </div>
                        <div className="col-sm-2">
                            <strong>Code</strong>
                        </div>
                        <div className="col-sm-2">
                            <strong>City</strong>
                        </div>
                        <div className="col-sm-2">
                            <strong>Country</strong>
                        </div>
                    </div>
                </CardBody>
                {this.state.airports.map((airport) => (
                    <div>
                    <Card className="airportCard">
                        <CardBody>                            
                            <div className="row">
                                <div className="col-sm-2">
                                    {airport.airportName}
                                </div>
                                <div className="col-sm-2">
                                    {airport.airportCode}
                                </div>
                                <div className="col-sm-2">
                                    {airport.cityName}
                                </div>
                                <div className="col-sm-2">
                                    {airport.countryName}
                                </div>
                                <div className="col">
                                    <Link to={{
                                        pathname: "/airport-details",
                                        state: {
                                            payload: airport.airportId
                                        }
                                    }}
                                    >
                                        <Button color="info">Details</Button>
                                    </Link>
                                </div>
                                <div className="col"/>
                                <div>
                                    <Link to={{
                                        pathname: "/airport-edit",
                                        state: {
                                            payload: airport.airportId 
                                                }
                                            }}
                                        > 
                                        <Button color="primary">Edit</Button>
                                    </Link>
                                </div>
                                <div className="col" />
                                    <Link to={{
                                        pathname: "/airport-delete",
                                        state: {
                                            payload: airport.airportId
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
                    <Link to="/airport-add">            
                            <Button color="primary">Add airport</Button>  
                    </Link>                         
                </CardBody>                
            </div>
        );
    }

}