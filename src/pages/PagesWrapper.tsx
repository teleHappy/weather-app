import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Weather from './Weather';
import Hourly from './Hourly';
import Daily from './Daily';
import { WeatherData } from '../types/WeatherData';
import { getWeatherData } from '../api/weather';
import { CurrentLocationContext } from '../context/CurrentLocationContext';

function PagesWrapper() {
  const currentLocationContext = useContext(CurrentLocationContext);
  const { lat, lon } = currentLocationContext.currentLocation;
  const units = 'imperial';

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // when app loads, get weatherData
  useEffect(() => {
    getWeatherData(lat, lon, units)
      .then((responseData) => {
        setWeatherData(responseData);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [lat, lon]);

  if (isLoading) return <div id='loading'>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <Router>
      <Routes>
        <Route
          path='/weather-app/'
          element={<Weather weatherData={weatherData} />}
        />
        <Route
          path='/weather-app/hourly'
          element={<Hourly weatherData={weatherData} />}
        />
        <Route
          path='/weather-app/daily'
          element={<Daily weatherData={weatherData} />}
        />
      </Routes>
    </Router>
  );
}

export default PagesWrapper;
