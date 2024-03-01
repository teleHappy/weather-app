import { useState, useEffect } from "react";
import { LocationSearchResult } from "../types/LocationSearchResult";

function useLocationData(zipcode: string = "02056") {
  const [searchResults, setSearchResults] =
    useState<LocationSearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLocationData(zipcode)
      .then((responseData) => {
        setSearchResults(responseData);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [zipcode]);

  async function getLocationData(zipcode: string) {
    const appid = import.meta.env.VITE_APP_LOCATION_API;
    const apiUrl = import.meta.env.VITE_APP_LOCATION_API_URL;

    const url = `${apiUrl}?q=${searchResults}&appid=${appid}&format=json&countrycodes=us&type=place:city,place:town,place:locality`;
    return fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }

  return { searchResults, isLoading, error };
}

export default useLocationData;
