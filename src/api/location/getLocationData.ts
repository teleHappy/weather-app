/**
 * Retrieves location data based on a given zipcode.
 * @param zipcode - The zipcode to search for.
 * @returns A promise that resolves to the location data.
 */
export async function getLocationData(zipcode: string) {
  const apiUrl = import.meta.env.VITE_APP_LOCATION_SEARCH;
  const apiKey = import.meta.env.VITE_APP_LOCATION_SEARCH_API_KEY;

  const url = `${apiUrl}?q=${zipcode}&key=${apiKey}&format=json&countrycodes=us&type=place:city,place:town,place:locality`;

  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
