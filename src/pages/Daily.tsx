import React from "react";
import NavBar from "../components/NavBar";
import { getDayRangeString, getDateString } from '../utilities/utils'; // adjust the path as needed
import { Daily as Day } from "../types/WeatherData";
import { WeatherData } from "../types/WeatherData";
import LocationHeader from "../components/LocationHeader";

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
               <LocationHeader />

                <NavBar selected="daily" />

                <h2 className="dayRangeHeader">{getDayRangeString(weatherData.daily)}</h2>

                <section className="daily">
                    {mode === 'tabular' &&
                        <table>
                            {/* <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Conditions</th>
                                    <th>Hi | Lo</th>
                                    <th>Description</th>
                                </tr>
                            </thead> */}
                            <tbody>
                                {weatherData.daily.map((day: Day) => (
                                    <tr key={day.dt}>
                                        <td>{getDateString(day.dt, 'day')}</td>
                                        <td style={{backgroundColor: "rgb(255 255 255 / 50%)"}}><img src={getIconUrl(day.weather[0].icon)} /></td>
                                        <td style={{width: "4rem", textAlign: "right"}}>{Math.round(day.temp.max)} | {Math.round(day.temp.min)}</td>
                                        <td>{day.summary}</td>
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