import React from "react";
import NavBar from '../components/NavBar';
import { degToCompass, getDateString } from '../utilities/utils'; // adjust the path as needed
import { WeatherData } from "../types/WeatherData";

const getTableRow = (label: string, value: string) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  )
}

type WeatherComponentProps = {
  weatherData: WeatherData | null;
}

const Weather = ({weatherData}: WeatherComponentProps) => {
  
  if (weatherData) {
    const weatherIcon = weatherData.current.weather[0].icon;
    const weatherDescription = weatherData.current.weather[0].description;
    const highTemp = weatherData.daily[0].temp.max;
    const lowTemp = weatherData.daily[0].temp.min;

    return (
      <div>
        <h1>Norfolk, Massachusetts</h1>
        
        <NavBar selected="current" />
        
        <h2 className="currentHeader">{getDateString(weatherData.current.dt)}</h2>
        
        <section className="weatherSection">
          <div className="container" style={{ height: "5rem" }}>
            {/* Current Temp */}
            <div>
              <p className="currentTemp">{Math.round(weatherData.current.temp)} °F</p>
            </div>
            {/* Current Icon */}
            <div className="currentIcon">
              <img width="100px" height="100px" src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={weatherDescription} />
            </div>
          </div>

          <div className="container" style={{ height: "3rem" }}>
            {/* Feels like */}
            <div>
              <p>Feels like: {Math.round(weatherData.current.feels_like)} °F</p>
            </div>
            {/* Short Description */}
            <div>
              <p>{weatherDescription}</p>
            </div>
          </div>
          <div className="container" style={{ display: "flex", height: "3rem", width: "70%" }}>
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

        {/* observation details */}
        <section className="observationSection">
          <div className="observations">
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

export default Weather;
