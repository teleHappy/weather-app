import { useEffect, useState } from "react";
import moment from "moment";
// import { WeatherData } from './types/weather';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function degToCompass(num) {
    const val = Math.floor(num / 22.5 + 0.5);
    const arr = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return arr[val % 16];
  }

  function getDateString(unix_timestamp) {
    return moment.unix(unix_timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a");
  }

  function getWeatherData(
    lat = '42.12183362681974' ,
    lon = '-71.3208231521948', 
    units = 'imperial') {
    const appid = import.meta.env.VITE_APP_WEATHER_DATA_API_KEY;
    const apiUrl = import.meta.env.VITE_APP_WEATHER_DATA_API;

    const url = `${apiUrl}?lat=${lat}&lon=${lon}&units=${units}&appid=${appid}`
    fetch(
      url
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setIsLoading(false);
      });
  }


  useEffect(() => {
    getWeatherData();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>{getDateString(weatherData.current.dt)}</h2>
      <h3>{weatherData.current.weather[0].description}</h3>
      <p>{Math.round(weatherData.current.temp)} °F</p>
      <p>Current wind: {Math.ceil(weatherData.current.wind_speed)} mph</p>
      <p>Current wind: {degToCompass(weatherData.current.wind_deg)}</p>
    </div>
  );
};

export default WeatherComponent;
