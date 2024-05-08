import moment from 'moment';
import { WeatherData } from '../types/WeatherData';

type DateRange = {
  dates: WeatherData['daily'] | WeatherData['hourly'];
};

function degToCompass(num: number) {
  const val = Math.floor(num / 22.5 + 0.5);
  const arr = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  return arr[val % 16];
}

function getDateRangeString(
  dates: DateRange['dates'],
  tz_offset: number,
  type: string = 'daily'
): string {
  const startDate = getLocalTime(dates[0].dt, tz_offset, type);
  const endDate = getLocalTime(dates[dates.length - 1].dt, tz_offset, type);

  return startDate + ' - ' + endDate;
}

function getLocalTime(
  utcTimestamp: number,
  utcShiftInSeconds: number,
  format: string
) {
  // Convert the UTC timestamp to a Moment.js object
  const momentObj = moment.unix(utcTimestamp);

  // Apply the UTC shift
  const localTime = momentObj.utcOffset(utcShiftInSeconds / 60); // utcOffset is in minutes

  switch (format) {
    case 'day':
      return localTime.format('ddd');
    case 'daily':
      return localTime.format('dddd MMMM Do');
    case 'hourly':
      return localTime.format('ddd Do h:mm a');
    case 'time':
      return localTime.format('h:mm a');
    default:
      return localTime.format('dddd MMMM Do h:mm a');
  }
}

export { degToCompass, getDateRangeString as getDayRangeString, getLocalTime };
