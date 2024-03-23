import React from "react";
import { degToCompass, getDateString } from "../../utilities/utils";
import { WeatherData } from "../../types/WeatherData";

type ObservationDetailsProps = {
  weatherData: WeatherData;
};

const getTableRow = (label: string, value: string) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  );
};

function ObservationDeatils({ weatherData }: ObservationDetailsProps) {
  const highTemp = weatherData.daily[0].temp.max;
  const lowTemp = weatherData.daily[0].temp.min;

  return (
    <section className="observationSection">
      <div className="observations">
        <h2>Current Observations</h2>
        <table>
          <tbody>
            {getTableRow("High", `${Math.round(highTemp)} °F`)}
            {getTableRow("Low", `${Math.round(lowTemp)} °F`)}
            {getTableRow(
              "Wind",
              degToCompass(weatherData.current.wind_deg) + " " + `${Math.ceil(weatherData.current.wind_speed)} mph`
            )}
            {getTableRow("Humidity", `${weatherData.current.humidity}%`)}
            {getTableRow("Sunrise", getDateString(weatherData.current.sunrise, "time"))}
            {getTableRow("Sunset", getDateString(weatherData.current.sunset, "time"))}
            {getTableRow("Clouds", `${weatherData.current.clouds}%`)}
            {getTableRow("Visibility", `${weatherData.current.visibility / 1000} km`)}
            {getTableRow("Dew point", `${weatherData.current.dew_point} °F`)}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ObservationDeatils;
