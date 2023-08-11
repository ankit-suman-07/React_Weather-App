import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Input from './Input';
import SearchResults from './SearchResults';
import SetUnits from './SetUnits';
import WeatherReport from './WeatherReport.js';
import debounce from 'lodash.debounce';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      selectedLocation: null,
      temperatureUnits: 'C',
      isLoading: false,
      isError: false,
    };
  }

  componentDidMount() {
    this.getWeather();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.temperatureUnits !== this.state.temperatureUnits) {
      this.getWeather();
    }
  }

  searchLocations = debounce(keyword => {
    // Implement the API call to search locations based on the keyword
    // Update the searchResults state with the fetched data
  }, 300);

  getWeather = () => {
    const { selectedLocation, temperatureUnits } = this.state;
    if (selectedLocation) {
      // Implement the API call to fetch weather data for the selected location and units
      // Update the selectedLocation state with the fetched data
    }
  };

  handleLocationSelect = location => {
    this.setState({ selectedLocation: location }, this.getWeather);
  };

  handleUnitChange = unit => {
    this.setState({ temperatureUnits: unit });
  };

  render() {
    const { searchResults, selectedLocation, temperatureUnits, isLoading, isError } = this.state;

    return (
      <Router>
        <div className="app">
          <Input onSearch={this.searchLocations} />
          <SearchResults
            results={searchResults}
            onSelectLocation={this.handleLocationSelect}
          />
          <SetUnits units={temperatureUnits} onChange={this.handleUnitChange} />
          <Route
            path="/"
            exact
            render={() => (
              <WeatherReport
                location={selectedLocation}
                units={temperatureUnits}
                isLoading={isLoading}
                isError={isError}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
