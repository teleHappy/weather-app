import React from "react";
import NavBar from "../components/NavBar";
import { degToCompass, getDateString } from '../utilities/utils'; // adjust the path as needed
import { WeatherData } from "../types/WeatherData";

const getHourlyTabularView = (weatherData: WeatherData) => {
    const cachedArray: string[] = [];
    // console.log("hourly")
    return (
        <section className="hourly">
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

                                [<tr className="fullDateRow" key={hour.dt + "daterow"}>
                                    <td colSpan={6}>{getDateString(hour.dt, "full")}</td>
                                </tr>,
                                <tr key={hour.dt}>
                                    <td>{getDateString(hour.dt, 'time')}</td>
                                    <td className="tdAlignRight">{Math.round(hour.temp)} °F</td>
                                    <td className="tdAlignRight">{Math.round(hour.feels_like)} °F</td>
                                    <td>{degToCompass(hour.wind_deg)} {Math.round(hour.wind_speed)} mph</td>
                                    <td className="tdAlignRight">{hour.humidity} %</td>
                                    <td>{hour.weather[0].description}</td>
                                </tr>]

                            )
                        }
                        else {
                            return (
                                <tr key={hour.dt + "single"}>
                                    <td>{getDateString(hour.dt, 'time')}</td>
                                    <td className="tdAlignRight">{Math.round(hour.temp)} °F</td>
                                    <td className="tdAlignRight">{Math.round(hour.feels_like)} °F</td>
                                    <td>{degToCompass(hour.wind_deg)} {Math.round(hour.wind_speed)} mph</td>
                                    <td className="tdAlignRight">{hour.humidity} %</td>
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

type HourlyProps = {
    weatherData: WeatherData | null;
}

function Hourly({ weatherData }: HourlyProps) {
    let mode = 'tabular'

    if (weatherData) {
        return (
            <>
                <h1>Norfolk, Massachusetts</h1>
                
                <NavBar selected="hourly" />

                <section className="weatherSection">
                    <div>
                        {mode === 'tabular' && getHourlyTabularView(weatherData)}
                    </div>
                </section>
            </>
        );
    }
}

export default Hourly;