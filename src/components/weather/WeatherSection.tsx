import React from "react";
import { WeatherData } from "../../types/WeatherData";

type WeatherDataProps = {
  weatherData: WeatherData;
};

function WeatherSection({ weatherData }: WeatherDataProps) {
  const weatherIcon = weatherData.current.weather[0].icon;
  const weatherDescription = weatherData.current.weather[0].description;
  const currentTemp = weatherData.current.temp;
  const feelsLike = weatherData.current.feels_like;

  return (
    <section className="weatherSection">
      <div className="container">
        {/* Current Temp */}
        <div>
          <p className="currentTemp">{Math.round(currentTemp)} °F</p>
        </div>
        {/* Current Icon */}
        <div className="currentIcon">
          <img
            src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            width="100"
            height="100"
            alt={weatherDescription}
          />
        </div>
      </div>

      <div className="container">
        {/* Feels like */}
        <div>
          <p>Feels like: {Math.round(feelsLike)} °F</p>
        </div>
        {/* Short Description */}
        <div>
          <p>{weatherDescription}</p>
        </div>
      </div>
    </section>
  );
}

export default WeatherSection;
