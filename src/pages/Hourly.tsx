import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { degToCompass, getDateString } from '../utilities/utils'; // adjust the path as needed
import useWeatherData from "../hooks/useWeatherData";
import { WeatherData } from "../types/WeatherData";
import styles from './Hourly.module.css';

const getTabularView = (weatherData: WeatherData) => {
    return (
        <section className={styles.hourly}>
            <h2>Hourly Forecast</h2>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Temp</th>
                        <th>Feels Like</th>
                        <th>Wind</th>
                        <th>Humidity</th>
                        <th>Weather</th>
                    </tr>
                </thead>
                <tbody>
                    {weatherData.hourly.map((hour, index) => {
                        return (
                            <tr key={index}>
                                <td>{getDateString(hour.dt, 'time')}</td>
                                <td>{Math.round(hour.temp)} °F</td>
                                <td>{Math.round(hour.feels_like)} °F</td>
                                <td>{degToCompass(hour.wind_deg)} {Math.round(hour.wind_speed)} mph</td>
                                <td>{hour.humidity} %</td>
                                <td>{hour.weather[0].description}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </section>
    )

}


function Hourly() {
    const lat = '42.34112443878151';
    const lon = '-71.08650809985224';
    const units = 'imperial';
    const { weatherData, isLoading, error } = useWeatherData(lat, lon, units);
    let mode = 'tabular'

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>{error}</div>;

    if (weatherData) {
        return (
            <>
                <h1>Norfolk, Massachusetts</h1>
                <nav className={styles.navbar}>
                    <ul className={styles.nav_list}>
                        <li className={`${styles.nav_item}`}><Link to="/">Now</Link></li>
                        <li className={`${styles.nav_item} ${styles.selected}`}><Link to="/hourly">Hourly</Link></li>
                        <li className={styles.nav_item}><a href="#">Daily</a></li>
                    </ul>
                </nav>
                <h2 className={styles.header2}>{getDateString(weatherData.current.dt)}</h2>
                <section className={styles.weatherSection}> 
                    <div>
                        { mode === 'tabular' && getTabularView(weatherData) }
                    </div>
                </section>
            </>
        );
    }


}

export default Hourly;