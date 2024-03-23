import React, { useRef } from "react";
import { WeatherData } from "../../types/WeatherData";
import { getDateString, degToCompass } from "../../utilities/utils";

type WeatherDataProps = {
  weatherData: WeatherData;
};

function HourlyTabluarView({ weatherData }: WeatherDataProps) {
  const cachedArray: string[] = [];
  const innerCounter = useRef(0);

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
              innerCounter.current = 0;
              return [
                <tr className="fullDateRow" key={hour.dt + "daterow"}>
                  <td colSpan={6}>{getDateString(hour.dt, "full")}</td>
                </tr>,
                <tr key={hour.dt} className="odd">
                  <td>{getDateString(hour.dt, "time")}</td>
                  <td className="tdAlignRight">{Math.round(hour.temp)} °F</td>
                  <td className="tdAlignRight">{Math.round(hour.feels_like)} °F</td>
                  <td>
                    {degToCompass(hour.wind_deg)} {Math.round(hour.wind_speed)} mph
                  </td>
                  <td className="tdAlignRight">{hour.humidity} %</td>
                  <td>{hour.weather[0].description}</td>
                </tr>,
              ];
            } else {
              innerCounter.current++;

              return (
                <tr key={hour.dt + "single"} className={innerCounter.current % 2 === 0 ? "odd" : ""}>
                  <td>{getDateString(hour.dt, "time")}</td>
                  <td className="tdAlignRight">{Math.round(hour.temp)} °F</td>
                  <td className="tdAlignRight">{Math.round(hour.feels_like)} °F</td>
                  <td>
                    {degToCompass(hour.wind_deg)} {Math.round(hour.wind_speed)} mph
                  </td>
                  <td className="tdAlignRight">{hour.humidity} %</td>
                  <td>{hour.weather[0].description}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </section>
  );
}

export default HourlyTabluarView;
