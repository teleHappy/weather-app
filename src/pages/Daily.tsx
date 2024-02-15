import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Link } from 'react-router-dom';
import { getDayRangeString, getDateString } from '../utilities/utils'; // adjust the path as needed
import useWeatherData from "../hooks/useWeatherData";
import { Daily as Day } from "../types/WeatherData";
import styles from './Daily.module.css';

function getIconUrl(icon: string) {
    return `http://openweathermap.org/img/wn/${icon}.png`;
}

function Daily() {
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
                <NavBar selected="daily" />
             
                <h2 className={styles.dayRangeHeader}>{getDayRangeString(weatherData.daily)}</h2>
             
                <section className={styles.weatherSection}>

                    {mode === 'tabular' &&

                        <table className={styles.weatherTable}>
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Conditions</th>
                                    <th>Hi | Lo</th>
                                    <th>Description</th>

                                </tr>
                            </thead>
                            <tbody>
                                {weatherData.daily.map((day: Day) => (
                                    <tr key={day.dt}>
                                        <td>{getDateString(day.dt, 'day')}</td>
                                        <td><img src={getIconUrl(day.weather[0].icon)} /></td>
                                        <td>{Math.round(day.temp.max)} | {Math.round(day.temp.min)}</td>
                                        <td>{day.weather[0].description}</td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    }
                </section>
            </>
        );
    }


}

export default Daily;