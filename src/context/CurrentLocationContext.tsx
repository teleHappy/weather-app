import React, { createContext, useState } from 'react'
import { LocationSearchResult } from '../types/LocationSearchResult';

/**
 * The default location to use if the user has not set a location.
 */
const defaultLocation: LocationSearchResult = {
    "place_id": "343121597",
    "licence": "https://locationiq.com/attribution",
    "boundingbox": [
        "41.956196859524",
        "42.276196859524",
        "-71.476388090476",
        "-71.156388090476"
    ],
    "lat": "42.11619685952381",
    "lon": "-71.3163880904762",
    "display_name": "Norfolk, Norfolk County, Massachusetts, US-MA, 02056, USA",
    "class": "place",
    "type": "postcode",
    "importance": 0.33499999999999996
}

// The context type
type CurrentLocationContextType = {
    currentLocation: LocationSearchResult,
    setCurrentLocation: (location: LocationSearchResult) => void
}

// The context
export const CurrentLocationContext = createContext<CurrentLocationContextType>({} as CurrentLocationContextType)

// The provider
let Provider = CurrentLocationContext.Provider;

// The default location to use if the user has not set a location.
const localStorageCurrentLocation = localStorage.getItem('currentLocation');
const location = (localStorageCurrentLocation) ? JSON.parse(localStorageCurrentLocation) : defaultLocation;

/**
 * The provider for the current location context.
 * 
 * @param children The children to render.
 * @returns The rendered JSX elements.
 */
const CurrentLocationProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentLocation, setCurrentLocation] = useState<LocationSearchResult>(location);

    return (
        <Provider value={{ currentLocation, setCurrentLocation }}>
            {children}
        </Provider>
    )
}

export default CurrentLocationProvider