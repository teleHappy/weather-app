import React from "react";
import HourlyTabluarView from "../components/weather/HourlyTabluarView";
import HourlyGraphsView from "../components/weather/HourlyGraphsView";
import LocationHeader from "../components/location/LocationHeader";
import NavBar from "../components/NavBar";
import { getDayRangeString } from "../utilities/utils";
import { WeatherData } from "../types/WeatherData";
import { fakeWeatherData } from "../mocks/fakeWeatherData";

type HourlyProps = {
  weatherData: WeatherData | null;
};

function Hourly({ weatherData }: HourlyProps) {
  let mode = "graph";

  if (weatherData) {
    return (
      <>
        <LocationHeader />

        <NavBar selected="hourly" />

        <h2 className="dayRangeHeader">{getDayRangeString(weatherData.hourly, "hourly")}</h2>

        <section className="weatherSection">
          {mode === "tabular" && <HourlyTabluarView weatherData={weatherData} />}
          {mode === "graph" && <HourlyGraphsView weatherData={weatherData} />}
        </section>
      </>
    );
  }
}

export default Hourly;
