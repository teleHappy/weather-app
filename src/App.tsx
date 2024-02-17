import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Weather from './pages/Weather';
import Hourly from './pages/Hourly';
import Daily from './pages/Daily';
import useWeatherData from './hooks/useWeatherData';

function App() {
  const lat = '42.11943';
  const lon = '-71.33055';
  const units = 'imperial';
  const { weatherData, isLoading, error } = useWeatherData(lat, lon, units);

  if (isLoading) return <div id="loading">Loading...</div>

  if (error) return <div>{error}</div>

  return (
    <Router>
      <Routes>
        <Route path="/weather-app/" element={<Weather weatherData={weatherData} />} />
        <Route path="/weather-app/hourly" element={<Hourly weatherData={weatherData} />} />
        <Route path="/weather-app/daily" element={<Daily weatherData={weatherData} />} />
      </Routes>
    </Router>
  );
}

export default App;
