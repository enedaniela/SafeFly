import React, { Component } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Container, Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from "react-router-dom";
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class AddFlight extends Component {

    static displayName = AddFlight.name;

    constructor(props) {
        super(props);
        this.state = {
            flightNumber: "",
            airline: "",
            price: "",
            status: "",
            numberOfPassengers: "",
            takeOffAirport: "",
            takeOffDate: "",
            landingAirport: "",
            landingDate: "",
            flightStatus: [
                "Scheduled",
                "Delayed",
                "Departed",
                "In Air",
                "Expected",
                "Diverted",
                "Recovery",
                "Landed",
                "Arrived",
                "Cancelled",
                "No Takeoff Info - Call Airline",
                "Past Flight",
            ],
            airlines: [],
            airports: [],
            takeOffAirportDescription: "Take Off Airport",
            landingAirportDescription: "Landing  Airport",
            airlineDescription: "Airline",
            statusDescription: "Status"
        };

        this.handleFlightNumberChange = this.handleFlightNumberChange.bind(this);
        this.handleAirlineChange = this.handleAirlineChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleNumberOfPassengersChange = this.handleNumberOfPassengersChange.bind(this);
        this.handleTakeOffAirportChange = this.handleTakeOffAirportChange.bind(this);
        this.handleTakeOffDateChange = this.handleTakeOffDateChange.bind(this);
        this.handleLandingAirportChange = this.handleLandingAirportChange.bind(this);
        this.handleLandingDateChange = this.handleLandingDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.populateAirportsData();
        this.populateAirlinesData();
    }

    async populateAirportsData() {
        const response = await fetch(`airports/get-airports`);
        const data = await response.json();
        this.setState({ airports: data, loading: false });
    }

    async populateAirlinesData() {
        const response = await fetch(`airlines/get-airlines`);
        const data = await response.json();
        this.setState({ airlines: data, loading: false });
    }

    async handleSubmit(event) {
        let takeOffMomentObj = moment(this.state.takeOffDate, 'YYYY-MM-DDLT');
        let takeOffDateTime = takeOffMomentObj.format('YYYY-MM-DDTHH:mm:ss.sss');

        let landingMomentObj = moment(this.state.landingDate, 'YYYY-MM-DDLT');
        let landingDateTime = landingMomentObj.format('YYYY-MM-DDTHH:mm:ss.sss');

        let flight = {
            flightNumber: this.state.flightNumber,
            airline: this.state.airline.airlineId,
            price: this.state.price,
            status: this.state.status,
            numberOfPassengers: this.state.numberOfPassengers,
            takeOffAirport: this.state.takeOffAirport.airportId,
            takeOffDate: takeOffDateTime,
            landingAirport: this.state.landingAirport.airportId,
            landingDate: landingDateTime,
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(flight)
        };

        await fetch(`flights/add-flight`, requestOptions);

        this.props.history.push('/flights');
    }

    handleFlightNumberChange(event) {
        this.setState({ flightNumber: event.target.value });
    }

    handleAirlineChange(eventKey, event) {
        let airline = this.state.airlines.find(a => a.airlineId == eventKey);        
        this.setState({ airline: airline, airlineDescription: airline.airlineName });
    }

    handlePriceChange(event) {
        this.setState({ price: event.target.value });
    }

    handleStatusChange(eventKey, event) {
        this.setState({ status: eventKey, statusDescription: eventKey });
    }

    handleNumberOfPassengersChange(event) {
        this.setState({ numberOfPassengers: event.target.value });
    }

    handleTakeOffAirportChange(eventKey, event) {
        var takeOffAirport = this.state.airports.find(a => a.airportId == eventKey);
        this.setState({ takeOffAirport: takeOffAirport, takeOffAirportDescription: takeOffAirport.airportName });
    }

    handleTakeOffDateChange(value) {
        this.setState({takeOffDate: value});
    }

    handleLandingAirportChange(eventKey, event) {
        var landingAirport = this.state.airports.find(a => a.airportId == eventKey);
        this.setState({ landingAirport: landingAirport, landingAirportDescription: landingAirport.airportName });
    }

    handleLandingDateChange(value) {
        this.setState({ landingDate: value });
    }

    render() {
        return (
            <Container className="addFlight">
                <h2>Add new flight</h2>
                <Form>
                    <Col>
                        <FormGroup row>
                            <Label for="flightNumber" sm={2}>Flight Number</Label>
                            <Col sm={3}>
                                <Input type="text" name="flightNumber" id="flightNumber" value={this.state.flightNumber}
                                    onChange={this.handleFlightNumberChange} placeholder="e.g. HFG34Z" />
                            </Col>
                        </FormGroup>
                    </Col>                    
                    <Col>
                        <FormGroup row>
                            <Label for="price" sm={2}>Price</Label>
                            <Col sm={3}>
                                <Input type="text" name="price" id="price" value={this.state.price}
                                    onChange={this.handlePriceChange} placeholder="e.g. 100" />
                            </Col>
                        </FormGroup>
                    </Col>                    
                    <Col>
                        <FormGroup row>
                            <Label for="nrPassengers" sm={2}>Number of Passengers</Label>
                            <Col sm={3}>
                                <Input type="number" name="nrPassengers" id="nrPassengers" value={this.state.numberOfPassengers}
                                    onChange={this.handleNumberOfPassengersChange} placeholder="e.g. 40" />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup row>
                            <Label for="status" sm={2}>Status</Label>
                            <Col sm={3}>
                                <DropdownButton className="" id="status" title={this.state.statusDescription} onSelect={this.handleStatusChange.bind(this)}>
                                    {this.state.flightStatus.map((status) => (
                                        <Dropdown.Item eventKey={status} value={status}>{status}</Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup row>
                            <Label for="airline" sm={2}>Airline</Label>
                            <Col sm={3}>
                                <DropdownButton className="" id="airline" title={this.state.airlineDescription} onSelect={this.handleAirlineChange.bind(this)}>
                                    {this.state.airlines.map((airline) => (
                                        <Dropdown.Item eventKey={airline.airlineId} value={airline.airlineName}>{airline.airlineName}</Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup row>
                            <Label for="takeOffAirport" sm={2}>Take off Details</Label>
                            <Col sm={2}>
                                <DropdownButton className="" id="takeOffAirport" title={this.state.takeOffAirportDescription} onSelect={this.handleTakeOffAirportChange.bind(this)}>
                                    {this.state.airports.map((airport) => (
                                        <Dropdown.Item eventKey={airport.airportId} value={airport.airportName}>{airport.airportName}</Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </Col>                            
                            <Col sm={6}> 
                                <DatePicker selected={this.state.takeOffDate} timeFormat='HH:mm' showTimeSelect timeIntervals={5} showMonthDropdown showYearDropdown
                                    dateFormat="Pp" placeholderText="Select take off date and time"
                                    onChange={this.handleTakeOffDateChange} id="takeOffDate" />
                            </Col>
                        </FormGroup>
                    </Col>             
                    <Col>
                        <FormGroup row>
                            <Label for="landingAirport" sm={2}>Landing Details</Label>
                            <Col sm={2}>
                                <DropdownButton className="" id="landingAirport" title={this.state.landingAirportDescription} onSelect={this.handleLandingAirportChange.bind(this)}>
                                    {this.state.airports.map((airport) => (
                                        <Dropdown.Item eventKey={airport.airportId} value={airport.airportName}>{airport.airportName}</Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </Col>               
                            <Col sm={6}>
                                <DatePicker selected={this.state.landingDate} timeFormat="p" showTimeSelect timeIntervals={5} showMonthDropdown showYearDropdown
                                    dateFormat="Pp" placeholderText="Select landing date and time"
                                    onChange={this.handleLandingDateChange} id="landingDate" />
                            </Col>
                        </FormGroup>
                    </Col>                         
                    <div className="row">
                        <div className="col-sm-1">
                            <Button color="success" onClick={this.handleSubmit} >Submit</Button>
                        </div>
                        <div className="col-sm-1">
                            <Link to="/flights">
                                <Button color="primary">Back</Button>
                            </Link>
                        </div>
                    </div>
                </Form>
            </Container>
        );
    }
}