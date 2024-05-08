import React from 'react';
import NavBar from '../components/NavBar';
import { getLocalTime } from '../utilities/utils'; // adjust the path as needed
import { WeatherData } from '../types/WeatherData';
import LocationHeader from '../components/location/LocationHeader';
import WeatherSection from '../components/weather/WeatherSection';
import ObservationDeatils from '../components/weather/ObservationDeatils';

const getTableRow = (label: string, value: string) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  );
};

type WeatherComponentProps = {
  weatherData: WeatherData | null;
};

const Weather = ({ weatherData }: WeatherComponentProps) => {
  if (weatherData) {
    return (
      <div>
        <LocationHeader />

        <NavBar selected='current' />

        <h2 className='currentHeader'>
          {getLocalTime(
            weatherData.current.dt,
            weatherData.timezone_offset,
            'default'
          )}
        </h2>

        <WeatherSection weatherData={weatherData} />

        <ObservationDeatils weatherData={weatherData} />
      </div>
    );
  }
};

export default Weather;
