import moment from "moment";

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

function getDayRangeString<Day>(days: any[]): string {
  const firstDay = days[0].dt
  const lastDay = days[days.length - 1].dt

  return moment.unix(firstDay).format("MMMM Do") + " - " + moment.unix(lastDay).format("MMMM Do, YYYY");
}

function getDateString(unix_timestamp: number, format?: string): string {
  if (format === "time") {
    return moment.unix(unix_timestamp).format("h:mm a");
  }
  if (format === "day") {
    return moment.unix(unix_timestamp).format("dddd");
  }
  if (format === "full") {
    return moment.unix(unix_timestamp).format("dddd, MMMM Do, YYYY");
  }
  // default
  return moment.unix(unix_timestamp).format("dddd, MMMM Do");
}

export { degToCompass, getDateString, getDayRangeString };
