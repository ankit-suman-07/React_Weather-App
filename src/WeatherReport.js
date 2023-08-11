import React from 'react';

const WeatherReport = ({ weatherData, units }) => {
  const { location, icon, conditions, temp, temp_max, temp_min, feels_like, wind_speed, wind_direction, pressure, humidity } = weatherData;

  return (
    <div className="weather-report">
      <h2>Weather Report for {location}</h2>
      <div className="weather-info">
        <div className="weather-icon">
          <img src={icon} alt="Weather Icon" />
        </div>
        <div className="weather-details">
          <p>Conditions: {conditions}</p>
          <p>Temperature: {temp}°{units}</p>
          <p>High: {temp_max}°{units}</p>
          <p>Low: {temp_min}°{units}</p>
          <p>Feels Like: {feels_like}°{units}</p>
          <p>Wind Speed: {wind_speed} km/h</p>
          <p>Wind Direction: {wind_direction}°</p>
          <p>Pressure: {pressure} hPa</p>
          <p>Humidity: {humidity}%</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherReport;
