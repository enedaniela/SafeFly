import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Airports } from './components/airports/Airports';
import { AddAirport } from './components/airports/AddAirport';
import { EditAirport } from './components/airports/EditAirport';
import { DeleteAirport } from './components/airports/DeleteAirport';
import { AirportDetails } from './components/airports/AirportDetails';
import { Airlines } from './components/airlines/Airlines';
import { AddAirline } from './components/airlines/AddAirline';
import { EditAirline } from './components/airlines/EditAirline';
import { DeleteAirline } from './components/airlines/DeleteAirline';
import { AirlineDetails } from './components/airlines/AirlineDetails';
import { Flights } from './components/flights/Flights';
import { AddFlight } from './components/flights/AddFlight';
import { EditFlight } from './components/flights/EditFlight';
import { DeleteFlight } from './components/flights/DeleteFlight';
import { FlightDetails } from './components/flights/FlightDetails';

import './custom.css'


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/airports' component={Airports} />
        <Route path='/airport-add' component={AddAirport} />
        <Route path='/airport-edit' component={EditAirport} />
        <Route path='/airport-delete' component={DeleteAirport} />
        <Route path='/airport-details' component={AirportDetails} />
        <Route path='/airlines' component={Airlines} />
        <Route path='/airline-add' component={AddAirline} />
        <Route path='/airline-edit' component={EditAirline} />
        <Route path='/airline-delete' component={DeleteAirline} />
        <Route path='/airline-details' component={AirlineDetails} />
        <Route path='/flights' component={Flights} />
        <Route path='/flight-add' component={AddFlight} />
        <Route path='/flight-edit' component={EditFlight} />
        <Route path='/flight-details' component={FlightDetails} />
        <Route path='/flight-delete' component={DeleteFlight} />
      </Layout>
    );
  }
}
