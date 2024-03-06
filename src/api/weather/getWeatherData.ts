const WEATHER_DATA_URL = "https://api.openweathermap.org/data/3.0/onecall";

/**
 * Retrieves weather data from the API based on latitude, longitude, and units.
 * @param lat - The latitude of the location.
 * @param lon - The longitude of the location.
 * @param units - The units of measurement for the weather data.
 * @returns A Promise that resolves to the weather data in JSON format.
 */
export async function getWeatherData(lat: string, lon: string, units: string) {
  const apiUrl = WEATHER_DATA_URL;
  const appid = import.meta.env.VITE_APP_WEATHER_DATA_API_KEY;

  const url = `${apiUrl}?lat=${lat}&lon=${lon}&units=${units}&appid=${appid}`;
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export default getWeatherData;