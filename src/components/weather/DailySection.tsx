import React from "react";
import { getDateString } from "../../utilities/utils";
import { Daily as Day } from "../../types/WeatherData";

const getIconUrl = (icon: string) => {
  return `http://openweathermap.org/img/wn/${icon}.png`;
};

function DailySection({ weatherData, mode = "tabular" }: { weatherData: any; mode?: string }): JSX.Element {
  return (
    <section className="daily">
      {mode === "tabular" && (
        <table>
          <thead hidden role="rowheader">
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
                <td>{getDateString(day.dt, "day")}</td>
                <td style={{ backgroundColor: "rgb(255 255 255 / 50%)" }}>
                  <img src={getIconUrl(day.weather[0].icon)} />
                </td>
                <td style={{ width: "4rem", textAlign: "right" }}>
                  {Math.round(day.temp.max)} | {Math.round(day.temp.min)}
                </td>
                <td>{day.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default DailySection;
