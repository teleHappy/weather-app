import { useState, useEffect } from "react";
import { getWeatherData } from "../api/weather";
import { WeatherData } from "../types/WeatherData";

/**
 * A custom hook to get weather data.
 * 
 * @param lat The latitude of the location.
 * @param lon The longitude of the location.
 * @param units The units to use for the weather data.
 * @returns The weather data, loading state, and error.
 */
function useWeatherData(
  lat: string = "42.34112443878151",
  lon: string = "-71.08650809985224",
  units: string = "imperial"
) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getWeatherData(lat, lon, units)
        .then((responseData) => {
          setWeatherData(responseData);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 600);
  }, [lat, lon, units]);

  return { weatherData, isLoading, error };
}

export default useWeatherData;
