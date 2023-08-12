import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    this.inputRef = React.createRef(); // Create a ref
  }

  componentDidMount() {
    this.getWeather();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.temperatureUnits !== this.state.temperatureUnits) {
      this.getWeather();
    }
  }

  // searchLocations = debounce(keyword => {
  //   if (keyword.trim() !== "") {
  //     fetch(`http://api.weatherstack.com/current?access_key=0701b8cf7d8ef13a050ade1acee551bb&query=${keyword}`)
  //       .then(response => response.json())
  //       .then(data => {
  //         this.setState({ searchResults: data });
  //       })
  //       .catch(error => {
  //         console.error("Error fetching search results:", error);
  //       });
  //   } else {
  //     this.setState({ searchResults: [] });
  //   }
  // }, 300);

  searchLocations = debounce(keyword => {
    if (keyword.trim() !== "") {
      fetch(`http://api.weatherstack.com/current?access_key=0701b8cf7d8ef13a050ade1acee551bb&query=${keyword}`)
        .then(response => response.json())
        .then(data => {
          if (data.location) {
            // If location data is available in the response
            const location = {
              id: data.location.lat + data.location.lon, // Create a unique ID using lat and lon
              name: data.location.name
            };
            this.setState({ searchResults: [location] }); // Update the searchResults state
          } else {
            this.setState({ searchResults: [] }); // No matching location found
          }
        })
        .catch(error => {
          console.error("Error fetching search results:", error);
        });
    } else {
      this.setState({ searchResults: [] });
    }
  }, 300);
  

  // getWeather = () => {
  //   const { selectedLocation, temperatureUnits } = this.state;
  //   if (selectedLocation) {
  //     const unitsParam = temperatureUnits === 'C' ? 'C' : 'F';

  //     fetch(`https://api.weatherserver.com/weather/current/${selectedLocation.id}/${unitsParam}`)
  //       .then(response => response.json())
  //       .then(data => {
  //         this.setState({
  //           selectedLocation: {
  //             ...selectedLocation,
  //             weatherData: data
  //           },
  //           isLoading: false,
  //           isError: false
  //         });
  //       })
  //       .catch(error => {
  //         console.error("Error fetching weather data:", error);
  //         this.setState({ isLoading: false, isError: true });
  //       });

  //     this.setState({ isLoading: true, isError: false });
  //   }
  // };

  getWeather = () => {
    const { selectedLocation, temperatureUnits } = this.state;
    if (selectedLocation) {
      const unitsParam = temperatureUnits === 'C' ? 'm' : 'f'; // Use 'm' for Celsius and 'f' for Fahrenheit
  
      fetch(`http://api.weatherstack.com/current?access_key=0701b8cf7d8ef13a050ade1acee551bb&query=${selectedLocation.name},${selectedLocation.country}&unit=${unitsParam}`)
        .then(response => response.json())
        .then(data => {
          this.setState({
            selectedLocation: {
              ...selectedLocation,
              weatherData: data.current // Use the "current" object from the API response
            },
            isLoading: false,
            isError: false
          });
        })
        .catch(error => {
          console.error("Error fetching weather data:", error);
          this.setState({ isLoading: false, isError: true });
        });
  
      this.setState({ isLoading: true, isError: false });
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
          <Input ref={this.inputRef} onSearch={this.searchLocations} />
          <SearchResults results={searchResults} onLocationSelect={this.handleLocationSelect} />
          {/* <SearchResults results={searchResults} onSelectLocation={this.handleLocationSelect} /> */}
          <SetUnits units={temperatureUnits} onChange={this.handleUnitChange} />
          <Routes>
            <Route
              path="/"
              element={
                selectedLocation && selectedLocation.weatherData && (
                  <WeatherReport
                    weatherData={selectedLocation.weatherData}
                    units={temperatureUnits}
                  />
                )}
                
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

// Use PropTypes for type-checking
App.propTypes = {
  searchResults: PropTypes.array,
  selectedLocation: PropTypes.object,
  temperatureUnits: PropTypes.string,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
};

export default App;
