import React, { Component } from 'react';
import { Container, Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';

export class EditAirport extends Component {

    static displayName = EditAirport.name;

    constructor(props) {
        super(props);
        this.state = {
            airportId: "",
            airportName: "",
            airportCode: "",
            countryName: "",
            latitude: "",
            longitude: ""
        };

        this.handleAirportNameChange = this.handleAirportNameChange.bind(this);
        this.handleAirportCodeChange = this.handleAirportCodeChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleLatitudeChange = this.handleLatitudeChange.bind(this);
        this.handleLongitudeChange = this.handleLongitudeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const { airportId } = this.props.location.state;   
        this.getAirport(airportId);
    }

    async getAirport(airportId) {
        const response = await fetch(`nomenclatoare/airports/${encodeURIComponent(airportId)}`);
        const data = await response.json();
        this.setState({
            airportId: data.airportId,
            airportName: data.airportName,
            airportCode: data.airportCode,
            countryName: data.countryName,
            latitude: data.latitude,
            longitude: data.longitude,
            loading: false
        });
    }

    async handleSubmit(event) {

        let airport = {
            airportId: this.state.airportId,
            airportName: this.state.airportName,
            airportCode: this.state.airportCode,
            countryName: this.state.countryName,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
        } 

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(airport)
        };

        await fetch(`nomenclatoare/airports/edit-airport`, requestOptions);

        this.props.history.push('/airports');
    }

    handleAirportNameChange(event) {
        this.setState({ airportName: event.target.value });
    }

    handleAirportCodeChange(event) {
        this.setState({ airportCode: event.target.value });
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
            <Container className="editAirport">
                <h2>Edit airport</h2>
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
                    <Button color="success" onClick={this.handleSubmit} >Submit</Button>
                </Form>
            </Container>
        );
    }
}