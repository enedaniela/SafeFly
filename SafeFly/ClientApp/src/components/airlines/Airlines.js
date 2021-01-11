import React, { Component } from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import { Link } from "react-router-dom";

export class Airlines extends Component {

    static displayName = Airlines.name;

    constructor(props) {
        super(props);
        this.state = {
            airlines: [],
        };
    }

    componentDidMount() {
        this.populateAirlinesData();
    }

    async populateAirlinesData() {
        const response = await fetch(`airlines/get-airlines`);
        const data = await response.json();
        this.setState({ airlines: data, loading: false });
    }

    render() {
        return (
            <div>
                <CardBody>
                    <div className="row">
                        <div className="col-sm-2">
                            <strong>Airline</strong>
                        </div>
                        <div className="col-sm-2">
                            <strong>Code</strong>
                        </div>
                        <div className="col-sm-2">
                            <strong>Country</strong>
                        </div>
                    </div>
                </CardBody>
                {this.state.airlines.map((airline) => (
                    <div>
                        <Card className="airlineCard">
                            <CardBody>
                                <div className="row">
                                    <div className="col-sm-2">
                                        {airline.airlineName}
                                    </div>
                                    <div className="col-sm-2">
                                        {airline.airlineCode}
                                    </div>
                                    <div className="col-sm-2">
                                        {airline.countryName}
                                    </div>
                                    <div className="col-sm-1">
                                        <Link to={{
                                            pathname: "/airline-details",
                                            state: {
                                                payload: airline.airlineId
                                            }
                                        }}
                                        >
                                            <Button color="info">Details</Button>
                                        </Link>
                                    </div>
                                    <div className="col-sm-1" />
                                    <div>
                                        <Link to={{
                                            pathname: "/airline-edit",
                                            state: {
                                                payload: airline.airlineId
                                            }
                                        }}
                                        >
                                            <Button color="primary">Edit</Button>
                                        </Link>
                                    </div>
                                    <div className="col-sm-1" />
                                    <Link to={{
                                        pathname: "/airline-delete",
                                        state: {
                                            payload: airline.airlineId
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
                    <Link to="/airline-add">
                        <Button color="primary">Add airline</Button>
                    </Link>
                </CardBody>
            </div>
        );
    }
}