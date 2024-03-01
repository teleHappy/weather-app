import { LocationSearchResult } from "../../types/LocationSearchResult";

export const addLocation = (
  location: LocationSearchResult,
  savedLocations: LocationSearchResult[]
): LocationSearchResult[] => {
  if (savedLocations.length > 0) {
    if (
      !savedLocations.some(
        (savedLocation) => savedLocation.place_id === location.place_id
      )
    ) {
      savedLocations.push(location);
    }
  } else {
    savedLocations.push(location);
  }

  localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
  return savedLocations;
};

export const getSavedLocations = () => {
  return localStorage.getItem('savedLocations') || '[]';
}
/**
 * sets the current location in localstorage.
 * 
 * @param location 
 */
export const setCurrent = (location: LocationSearchResult) => {
  localStorage.setItem("currentLocation", JSON.stringify(location));
};

