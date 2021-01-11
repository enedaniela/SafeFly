import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { covid: [], forecasts: [], loading: true };
  }

    componentDidMount() {
        this.populateCovidData();
        //this.populateWeatherData();
  }

    static renderExternalServiceTable(covid, forecast) {
      return (
        <div>
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>CountryName</th>
            <th>Cases</th>
            <th>Deaths</th>
          </tr>
        </thead>
        <tbody>
          
            <tr key={covid.countryName}>
              <td>{covid.countryName}</td>
              <td>{covid.cases}</td>
              <td>{covid.deaths}</td>
            </tr>
          
        </tbody>
        </table>

        <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>CountryName</th>
                    <th>Temperature</th>
                    <th>Sunset</th>
                </tr>
            </thead>
            <tbody>

                <tr key={forecast.countryName}>
                    <td>{forecast.countryName}</td>
                    <td>{forecast.temperature}</td>
                    <td>{forecast.sunset}</td>
                </tr>
            </tbody>
        </table>
        </div>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderExternalServiceTable(this.state.covid, this.state.forecasts);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

    async populateCovidData() {
        const airportId = 1;
        const response = await fetch(`externalService/covid/${encodeURIComponent(airportId)}`);
        const data = await response.json();
        this.setState({ covid: data, loading: false });
    }

    async populateWeatherData() {
        const airportId = 1;
        const response = await fetch(`externalService/weather/${encodeURIComponent(airportId)}`);
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }
}
