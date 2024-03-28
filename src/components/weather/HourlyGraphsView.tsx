import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { getDateString } from "../../utilities/utils";
import { WeatherData } from "../../types/WeatherData";

type HourlyGraphsViewProps = {
  weatherData: WeatherData;
};

type payload = {
  coordinate: number;
  value: number;
  index: number;
  offset: number;
  tickCoord: number;
  isShow: boolean;
};

type CustomAxisTickProps = { x: number; y: number; payload: payload };

const renderCustomAxisTick = ({ x, y, payload }: CustomAxisTickProps) => {
  const tick = getDateString(payload.value, "time");
  return (
    <text x={x} y={y} dy={12} textAnchor="middle" className="rd">
      {tick}
    </text>
  );
};

const renderCustomYAxisTick = ({ x, y, payload }: CustomAxisTickProps) => {
  const tick = payload.value;
  return (
    <text x={x} y={y} dy={12} textAnchor="middle" className="rd">
      {tick}
    </text>
  );
};

function HourlyGraphsView({ weatherData }: HourlyGraphsViewProps) {
  return (
    <div>
      <LineChart
        width={600}
        height={300}
        data={weatherData.hourly.slice(0, 12)}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="temp" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey={"dt"} tick={renderCustomAxisTick} />
        <YAxis dataKey={"temp"} tick={renderCustomYAxisTick} />
      </LineChart>
    </div>
  );
}

export default HourlyGraphsView;
