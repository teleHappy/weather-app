import React from "react";
import HourlyTabluarView from "../components/weather/HourlyTabluarView";
import LocationHeader from "../components/location/LocationHeader";
import NavBar from "../components/NavBar";
import { getDayRangeString } from "../utilities/utils";
import { WeatherData } from "../types/WeatherData";

type HourlyProps = {
  weatherData: WeatherData | null;
};

function Hourly({ weatherData }: HourlyProps) {
  let mode = "tabular";

  if (weatherData) {
    return (
      <>
        <LocationHeader />

        <NavBar selected="hourly" />

        <h2 className="dayRangeHeader">{getDayRangeString(weatherData.hourly, "hourly")}</h2>

        <section className="weatherSection">
          {mode === "tabular" && <HourlyTabluarView weatherData={weatherData} />}
        </section>
      </>
    );
  }
}

export default Hourly;
