import { LocationSearchResult } from "../../types/LocationSearchResult";

export const setItemSavedLocations = (
  savedLocations: LocationSearchResult[]
): LocationSearchResult[] => {
  
  localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
  return savedLocations;
};

export const removeLocation = (location: LocationSearchResult): LocationSearchResult[] => {
  const savedLocations = JSON.parse(getItemSavedLocations());
  const updatedLocations = savedLocations.filter(
    (savedLocation: LocationSearchResult) =>
      savedLocation.place_id !== location.place_id
  );

  localStorage.setItem("savedLocations", JSON.stringify(updatedLocations));
  return updatedLocations;
}

export const getItemSavedLocations = () => {
  return localStorage.getItem("savedLocations") || "[]";
};
/**
 * sets the current location in localstorage.
 *
 * @param location
 */
export const setItemCurrentLocation = (location: LocationSearchResult) => {
  localStorage.setItem("currentLocation", JSON.stringify(location));
};
