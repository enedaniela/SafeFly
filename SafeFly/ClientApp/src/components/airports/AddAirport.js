import React, { Component } from 'react';
import { Container, Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from "react-router-dom";

export class AddAirport extends Component {

    static displayName = AddAirport.name;

    constructor(props) {
        super(props);
        this.state = {
            airportName: "",
            airportCode: "",
            cityName: "",
            countryName: "",
            latitude: "",
            longitude: ""
        };

        this.handleAirportNameChange = this.handleAirportNameChange.bind(this);
        this.handleAirportCodeChange = this.handleAirportCodeChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleLatitudeChange = this.handleLatitudeChange.bind(this);
        this.handleLongitudeChange = this.handleLongitudeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {   
        
        let airport = {
            airportName: this.state.airportName,
            airportCode: this.state.airportCode,
            cityName: this.state.cityName,
            countryName: this.state.countryName,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
        } 

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(airport)
        };

        await fetch(`airports/add-airport`, requestOptions);

        this.props.history.push('/airports');
    }

    handleAirportNameChange(event) {
        this.setState({ airportName: event.target.value });
    }

    handleAirportCodeChange(event) {
        this.setState({ airportCode: event.target.value });
    }

    handleCityChange(event) {
        this.setState({ cityName: event.target.value });
    }

    handleCountryChange(event) {
        this.setState({ countryName: event.target.value });
    }

    handleLatitudeChange(event) {
        this.setState({ latitude: event.target.value });
    }

    handleLongitudeChange(event) {
        this.setState({ longitude: event.target.value });
    }

    render() {
        return (
            <Container className="addAirport">
                <h2>Add new airport</h2>
                <Form>
                    <Col>
                        <FormGroup row>
                            <Label for="airportName" sm={2}>Airport Name</Label>
                            <Col sm={3}>
                                <Input type="text" name="airportName" id="airportName" value={this.state.airportName}
                                    onChange={this.handleAirportNameChange} placeholder="e.g. Otopeni" />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup row>
                            <Label for="airportCode" sm={2}>Airport Code</Label>
                            <Col sm={3}>
                                <Input type="text" name="airportCode" id="airportCode" value={this.state.airportCode}
                                    onChange={this.handleAirportCodeChange} placeholder="e.g. OTP" />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup row>
                            <Label for="city" sm={2}>City</Label>
                            <Col sm={3}>
                                <Input type="text" name="city" id="city" value={this.state.cityName}
                                    onChange={this.handleCityChange} placeholder="e.g. Bucharest" />
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
                    <Col>
                        <FormGroup row>
                            <Label for="latitude" sm={2}>Latitude</Label>
                            <Col sm={3}>
                                <Input type="text" name="latitude" id="latitude" value={this.state.latitude}
                                    onChange={this.handleLatitudeChange} placeholder="e.g. 44.57076" />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup row>
                            <Label for="longitude" sm={2}>Longitude</Label>
                            <Col sm={3}>
                                <Input type="text" name="longitude" id="longitude" value={this.state.longitude}
                                    onChange={this.handleLongitudeChange} placeholder="e.g. 26.08388" />
                            </Col>
                        </FormGroup>
                    </Col>
                    <div className="row">
                        <div className="col-sm-1">
                            <Button color="success" onClick={this.handleSubmit} >Submit</Button>
                        </div>
                        <div className="col-sm-1">
                            <Link to="/airports">
                                <Button color="primary">Back</Button>
                            </Link>
                        </div>
                    </div>     
                    </Form>
            </Container>
        );
    }
}