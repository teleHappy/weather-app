import React, { useContext, useState } from 'react'
import { LocationSearchResult } from '../../types/LocationSearchResult'
import LocationTabs from './LocationTabs';
import { CurrentLocationContext } from '../../context/CurrentLocationContext';
import { getLocationData } from '../../api/location';
import { addLocation, getSavedLocations, setCurrent } from '../../api/localstorage';

type LocationDialogProps = {
    handleClose: () => void

}

function LocationDialog({ handleClose }: LocationDialogProps) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState<LocationSearchResult[]>([]);
    const [searchError, setSearchError] = useState('');
    const [savedLocations, setSavedLocations] = useState<LocationSearchResult[]>(JSON.parse(getSavedLocations()));

    const { setCurrentLocation } = useContext(CurrentLocationContext)

    /**
     * Closes the location search dialog.
     */
    const onClose = () => {
        setSearchValue('');
        setSearchResults([]);
        setSearchError('');
        handleClose();
    };

    /**
     * Adds a location to the saved locations.
     */
    const add = () => {
        const location = searchResults[0];
        const updatedLocation = addLocation(location, savedLocations);

        // local state
        setSavedLocations(updatedLocation);
        setCurrentLocation(location);

        // localstorage state
        setCurrent(location);

        // close the dialog
        onClose();
    }

    /**
     * Handles searching for a location from the search input.
     * 
     * @param event 
     */
    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault();
        const searchResults = await getLocationData(searchValue);

        if (searchResults) {
            setSearchResults(searchResults);
            setSearchError('');
        }
    };

    /**
     * 
     * @param event 
     */
    const switchCurrentLocation = (event: React.MouseEvent) => {
        const location_id = (event.target as HTMLButtonElement).dataset.location_id;
        const location: LocationSearchResult | undefined = savedLocations.find(location => location.place_id === location_id);

        if (location) {
            // local state
            setCurrentLocation(location);
            // localstorage state
            setCurrent(location);
        }

        onClose();
    }

    const handleRemove = (event: React.MouseEvent) => {

        handleClose();
    }

    /**
     * 
     * @returns {JSX}
     */
    const savedLocationRows = () => {
        const rows = savedLocations.map((location: LocationSearchResult, idx) => {
            return (<li key={idx} style={{ paddingRight: ".5rem" }}>
                <span>📍</span>
                <span>
                    {location.display_name.split(",")[0]},  {location.display_name.split(",")[2]}
                </span>
                <button className="btn_primary" onClick={switchCurrentLocation} data-location_id={location.place_id} style={{ width: "80%" }}>Select</button>
                <button className="remove" onClick={handleRemove}>X</button>
            </li>)
        });

        return rows;
    }

    return (

        <div className="wrapper">
            <LocationTabs />

            {/* Add Location */}
            <section className="search active">
                <div className="searchForm">
                    <form onSubmit={handleSearch}>
                        <div className="search-fields">
                            <input name="zipcode" type="tel" placeholder="Zip Code" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} aria-describedby="location-error" />
                            <button className="btn_primary" type="submit">Search</button>
                        </div>
                        <div>
                            {searchError &&
                                <span id="location-error">Please enter a valid location.</span>
                            }
                        </div>
                    </form>
                </div>
                {searchResults.length === 0 &&
                    <div className="no-results">Enter a Zip Code</div>
                }
                {searchResults.length > 0 &&
                    <div className="results">

                        <ul>
                            {searchResults.map((result: LocationSearchResult, idx) => (
                                <li key={idx}>
                                    <span>📍</span>
                                    <span>
                                        {result.display_name.split(",")[0]},  {result.display_name.split(",")[2]}
                                    </span>
                                    <span></span>
                                    <button className="btn_primary" onClick={add}>Add</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </section>
            {/* Saved Locations */}
            <section className="saved">
                <div className="savedWrapper">
                    <ul className='results'>{savedLocationRows()}</ul>
                </div>
            </section>

            <section className="footer last-item">
                <button className="primary" onClick={onClose}>Close</button>
            </section>

        </div>

    )
}

export default LocationDialog
