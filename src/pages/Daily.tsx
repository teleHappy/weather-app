import React from 'react';
import NavBar from '../components/NavBar';
import { getDayRangeString } from '../utilities/utils'; // adjust the path as needed
import { WeatherData } from '../types/WeatherData';
import LocationHeader from '../components/location/LocationHeader';
import DailySection from '../components/weather/DailySection';

type DailyProps = {
  weatherData: WeatherData | null;
};

function Daily({ weatherData }: DailyProps) {
  if (weatherData) {
    return (
      <>
        <LocationHeader />

        <NavBar selected='daily' />

        <h2 className='dayRangeHeader'>
          {getDayRangeString(weatherData.daily, weatherData.timezone_offset)}
        </h2>

        <DailySection weatherData={weatherData} />
      </>
    );
  }
}

export default Daily;
