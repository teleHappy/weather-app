import moment from "moment";
import { WeatherData } from "../types/WeatherData";

type DateRange = {
  dates: WeatherData["daily"] | WeatherData["hourly"];
}

function degToCompass(num: number) {
  const val = Math.floor(num / 22.5 + 0.5);
  const arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
}

function getDateRangeString(dates: DateRange["dates"], type: string = "daily"): string {
  const startDate = dates[0].dt;
  const endDate = dates[dates.length - 1].dt;
  let dateRangeString = ""

  if (type === 'daily') {
    dateRangeString = moment.unix(startDate).format("dddd MMMM Do") + " - " + moment.unix(endDate).format("dddd MMMM Do");
  }
  if (type == 'hourly') {
    dateRangeString = moment.unix(startDate).format("ddd Do h:mm a") + " - " + moment.unix(endDate).format("ddd Do h:mm a");
  }

  return dateRangeString
}

function getDateString(unix_timestamp: number, format?: string): string {

  let dateString = moment.unix(unix_timestamp).format("dddd MMMM Do h:mm a"); // default

  if (format === "time") {
    dateString = moment.unix(unix_timestamp).format("h:mm a");
  }
  if (format === "day") {
    dateString = moment.unix(unix_timestamp).format("ddd");
  }
  if (format === "full") {
    dateString = moment.unix(unix_timestamp).format("dddd MMMM Do YYYY");
  }

  return dateString
}

export { degToCompass, getDateString, getDateRangeString as getDayRangeString };
