import React, { useRef } from "react";
import NavBar from "../components/NavBar";
import { degToCompass, getDateString } from '../utilities/utils'; // adjust the path as needed
import useWeatherData from "../hooks/useWeatherData";
import { WeatherData } from "../types/WeatherData";
import styles from './Hourly.module.css';

const getTabularView = (weatherData: WeatherData) => {
    const cachedArray: string[] = [];

    return (
        <section className={styles.hourly}>
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
                        const dayStr = getDateString(hour.dt, "day");

                        if (!cachedArray.includes(dayStr)) {
                            cachedArray.push(dayStr);
                            return (
                                <>
                                    <tr className={styles.fullDateRow} key={index+"daterow"}>
                                        <td colSpan={6}>{getDateString(hour.dt, "full")}</td>
                                    </tr>
                                    <tr key={index}>
                                        <td>{getDateString(hour.dt, 'time')}</td>
                                        <td className={styles.tdAlignRight}>{Math.round(hour.temp)} °F</td>
                                        <td className={styles.tdAlignRight}>{Math.round(hour.feels_like)} °F</td>
                                        <td>{degToCompass(hour.wind_deg)} {Math.round(hour.wind_speed)} mph</td>
                                        <td className={styles.tdAlignRight}>{hour.humidity} %</td>
                                        <td>{hour.weather[0].description}</td>
                                    </tr>
                                </>
                            )
                        }

                        else {

                            return (

                                <tr key={index}>
                                    <td>{getDateString(hour.dt, 'time')}</td>
                                    <td className={styles.tdAlignRight}>{Math.round(hour.temp)} °F</td>
                                    <td className={styles.tdAlignRight}>{Math.round(hour.feels_like)} °F</td>
                                    <td>{degToCompass(hour.wind_deg)} {Math.round(hour.wind_speed)} mph</td>
                                    <td className={styles.tdAlignRight}>{hour.humidity} %</td>
                                    <td>{hour.weather[0].description}</td>
                                </tr>
                            )
                        }
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
                <NavBar selected="hourly" />

                <section className={styles.weatherSection}>
                    <div>
                        {mode === 'tabular' && getTabularView(weatherData)}
                    </div>
                </section>
            </>
        );
    }


}

export default Hourly;