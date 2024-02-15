import React, { useEffect, useState } from "react";
import NavBar from '../components/NavBar';
import { degToCompass, getDateString } from '../utilities/utils'; // adjust the path as needed
import useWeatherData from "../hooks/useWeatherData";
import styles from './Weather.module.css';

const getTableRow = (label: string, value: string) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  )
}

const WeatherComponent = () => {
  //42.34112443878151, -71.08650809985224
  const lat = '42.34112443878151';
  const lon = '-71.08650809985224';
  const units = 'imperial';
  const { weatherData, isLoading, error } = useWeatherData(lat, lon, units);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  if (weatherData) {
    const weatherIcon = weatherData.current.weather[0].icon;
    const weatherDescription = weatherData.current.weather[0].description;
    const highTemp = weatherData.daily[0].temp.max;
    const lowTemp = weatherData.daily[0].temp.min;

    return (
      <div>
        <h1>Norfolk, Massachusetts</h1>
        
        <NavBar selected="weather" />
        
        <h2 className={styles.header2}>{getDateString(weatherData.current.dt)}</h2>
        
        <section className={styles.weatherSection}>
          <div className={styles.container} style={{ height: "5rem" }}>
            {/* Current Temp */}
            <div>
              <p className={styles.currentTemp}>{Math.round(weatherData.current.temp)} °F</p>
            </div>
            {/* Current Icon */}
            <div className={`${styles.currentIcon}`}>
              <img width="100px" height="100px" src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={weatherDescription} />
            </div>
          </div>

          <div className={styles.container} style={{ height: "3rem" }}>
            {/* Feels like */}
            <div>
              <p>Feels like: {Math.round(weatherData.current.feels_like)} °F</p>
            </div>
            {/* Short Description */}
            <div>
              <p>{weatherDescription}</p>
            </div>
          </div>
          <div className={styles.container} style={{ display: "flex", height: "3rem", width: "70%" }}>
            {/* High | Low Temp */}
            <div>
              <p>High: {Math.round(highTemp)} °F</p>
            </div>
            <div style={{ textAlign: "center", flexGrow: 0 }}>|</div>
            <div>
              <p>Low: {Math.round(lowTemp)} °F</p>
            </div>
          </div>
        </section>
        <section className={styles.observationSection}>
          <div className={styles.observations}>
            <h2 >Observations</h2>
            <table>
              <tbody>
                {getTableRow('Current wind', `${Math.ceil(weatherData.current.wind_speed)} mph`)}
                {getTableRow('Current wind', degToCompass(weatherData.current.wind_deg))}
                {getTableRow('Current humidity', `${weatherData.current.humidity}%`)}
                {getTableRow('Sunrise', getDateString(weatherData.current.sunrise, 'time'))}
                {getTableRow('Sunset', getDateString(weatherData.current.sunset, 'time'))}
                {getTableRow('Current clouds', `${weatherData.current.clouds}%`)}
                {getTableRow('Current visibility', `${weatherData.current.visibility / 1000} km`)}
                {getTableRow('Current dew point', `${weatherData.current.dew_point} °F`)}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    )

  }
}

export default WeatherComponent;
