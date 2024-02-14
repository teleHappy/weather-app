import { useState, useEffect } from 'react';
import { WeatherData } from '../types/WeatherData';

function useWeatherData(lat: string, lon: string, units: string) {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getWeatherData(lat, lon, units)
            .then(responseData => {
                setWeatherData(responseData);
            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {    
                setIsLoading(false);
            });
    }, [lat, lon, units]); // Empty dependency array means this effect runs once on mount
    
    async function getWeatherData(lat: string, lon: string, units: string) {
        const appid = import.meta.env.VITE_APP_WEATHER_DATA_API_KEY;
        const apiUrl = import.meta.env.VITE_APP_WEATHER_DATA_API;

        const url = `${apiUrl}?lat=${lat}&lon=${lon}&units=${units}&appid=${appid}`;
        return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            });
    }

    return { weatherData, isLoading, error };
}

export default useWeatherData;