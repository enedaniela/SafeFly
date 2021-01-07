import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Airports } from './components/airports/Airports';
import { AddAirport } from './components/airports/AddAirport';
import { EditAirport } from './components/airports/EditAirport';
import { AirportDetails } from './components/airports/AirportDetails';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/airports' component={Airports} />
        <Route path='/airports-add' component={AddAirport} />
        <Route path='/airports-edit' component={EditAirport} />
        <Route path='/airports-details' component={AirportDetails} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
      </Layout>
    );
  }
}
