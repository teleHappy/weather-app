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

  function getDateString(unix_timestamp: number, format?: string): string {
    if(format === 'time'){
      return moment.unix(unix_timestamp).format("h:mm a");
    }
    // default
    return moment.unix(unix_timestamp).format("dddd, MMMM Do");
  }

  export { degToCompass, getDateString };