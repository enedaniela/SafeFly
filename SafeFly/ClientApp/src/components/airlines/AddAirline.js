﻿import React, { Component } from 'react';
import { Container, Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from "react-router-dom";

export class AddAirline extends Component {

    static displayName = AddAirline.name;

    constructor(props) {
        super(props);
        this.state = {
            airlineName: "",
            airlineCode: "",
            countryName: ""
        };

        this.handleAirlineNameChange = this.handleAirlineNameChange.bind(this);
        this.handleAirlineCodeChange = this.handleAirlineCodeChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        let airline = {
            airlineName: this.state.airlineName,
            airlineCode: this.state.airlineCode,
            countryName: this.state.countryName,
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(airline)
        };

        await fetch(`airlines/add-airline`, requestOptions);

        this.props.history.push('/airlines');
    }

    handleAirlineNameChange(event) {
        this.setState({ airlineName: event.target.value });
    }

    handleAirlineCodeChange(event) {
        this.setState({ airlineCode: event.target.value });
    }

    handleCountryChange(event) {
        this.setState({ countryName: event.target.value });
    }

    render() {
        return (
            <Container className="addAirline">
                <h2>Add new airline</h2>
                <Form>
                    <Col>
                        <FormGroup row>
                            <Label for="airlineName" sm={2}>Airline Name</Label>
                            <Col sm={3}>
                                <Input type="text" name="airlineName" id="airlineName" value={this.state.airlineName}
                                    onChange={this.handleAirlineNameChange} placeholder="e.g. TAROM" />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup row>
                            <Label for="airlineCode" sm={2}>Airline Code</Label>
                            <Col sm={3}>
                                <Input type="text" name="airlineCode" id="airlineCode" value={this.state.airlineCode}
                                    onChange={this.handleAirlineCodeChange} placeholder="e.g. TAROM" />
                            </Col>
                        </FormGroup>
                    </Col>                 
                    <Col>
                        <FormGroup row>
                            <Label for="country" sm={2}>Country</Label>
                            <Col sm={3}>
                                <Input type="text" name="country" id="country" value={this.state.countryName}
                                    onChange={this.handleCountryChange} placeholder="e.g. Romania" />
                            </Col>
                        </FormGroup>
                    </Col>                   
                    <div className="row">
                        <div className="col-sm-1">
                            <Button color="success" onClick={this.handleSubmit} >Submit</Button>
                        </div>
                        <div className="col-sm-1">
                            <Link to="/airlines">
                                <Button color="primary">Back</Button>
                            </Link>
                        </div>
                    </div>
                </Form>
            </Container>
        );
    }
}