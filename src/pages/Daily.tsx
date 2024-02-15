import React from "react";
import NavBar from "../components/NavBar";
import { getDayRangeString, getDateString } from '../utilities/utils'; // adjust the path as needed
import { Daily as Day } from "../types/WeatherData";
import { WeatherData } from "../types/WeatherData";

function getIconUrl(icon: string) {
    return `http://openweathermap.org/img/wn/${icon}.png`;
}

type DailyProps = {
    weatherData: WeatherData | null;
}

function Daily({ weatherData }: DailyProps) {
    let mode = 'tabular'

    if (weatherData) {
        return (
            <>
                <h1>Norfolk, Massachusetts</h1>

                <NavBar selected="daily" />

                <h2 className="dayRangeHeader">{getDayRangeString(weatherData.daily)}</h2>

                <section className="daily">
                    {mode === 'tabular' &&
                        <table>
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