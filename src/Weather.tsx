import React, { useEffect, useState } from "react";
import { degToCompass, getDateString } from './utilities/utils'; // adjust the path as needed
import useWeatherData from "./hooks/useWeatherData";

const WeatherComponent = () => {
  const lat = '42.12183362681974';
  const lon = '-71.3208231521948';
  const units = 'imperial';
  const { weatherData, isLoading, error } = useWeatherData(lat, lon, units);


  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  if (weatherData) {

    return (
      <div>
        <h2>{getDateString(weatherData.current.dt)}</h2>
        <h3>{weatherData.current.weather[0].description}</h3>
        <p>{Math.round(weatherData.current.temp)} °F</p>
        <p>Current wind: {Math.ceil(weatherData.current.wind_speed)} mph</p>
        <p>Current wind: {degToCompass(weatherData.current.wind_deg)}</p>
        <p>Current dew point: {weatherData.current.dew_point}</p>
        <p>Current humidity: {weatherData.current.humidity}</p>
        <p>Current sunrise: {getDateString(weatherData.current.sunrise)}</p>
        <p>Current sunset: {getDateString(weatherData.current.sunset)}</p>
        <p>Current clouds: {weatherData.current.clouds}</p>
        <p>Current visibility: {weatherData.current.visibility / 1000} km</p>
      </div>
    );
  }
};

export default WeatherComponent;
