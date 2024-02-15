import React from 'react'; // Import the 'React' module
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Weather from './pages/Weather';
import Hourly from './pages/Hourly';
import Daily from './pages/Daily';
import useWeatherData from './hooks/useWeatherData';

function App() {


  const lat = '42.34112443878151';
  const lon = '-71.08650809985224';
  const units = 'imperial';
  const { weatherData, isLoading, error } = useWeatherData(lat, lon, units);


  if (isLoading) return <div>Loading...</div>

  if (error) return <div>{error}</div>


  return (<>
    <Router>
      <Routes>
        <Route path="/" element={<Weather weatherData={weatherData}/>} />
        <Route path="/hourly" element={<Hourly weatherData={weatherData}/>} />
        <Route path="/daily" element={<Daily weatherData={weatherData}/>} />
      </Routes>
    </Router>
  </>
  );
}

export default App;
