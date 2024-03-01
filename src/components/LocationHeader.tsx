import React, { useContext, useRef, useState } from 'react';
import { getLocationData } from '../api/location';
import { addLocation, getSavedLocations, setCurrent } from '../api/localstorage';
import { LocationSearchResult } from '../types/LocationSearchResult';
import { CurrentLocationContext } from '../context/CurrentLocationContext';

/**
 * The header component for the location.
 * 
 * @returns The rendered JSX elements.
 */
function LocationHeader() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState<LocationSearchResult[]>([]);
    const [searchError, setSearchError] = useState('');
    const [savedLocations, setSavedLocations] = useState<LocationSearchResult[]>(JSON.parse(getSavedLocations()));

    const { currentLocation, setCurrentLocation } = useContext(CurrentLocationContext)

    const dialogRef = useRef<HTMLDialogElement | null>(null);

    /**
     * Opens the location search dialog.
     */
    const openLocationSearch = () => {
        dialogRef.current?.showModal();
    };

    /**
     * Closes the location search dialog.
     */
    const handleClose = () => {
        setSearchValue('');
        setSearchResults([]);
        setSearchError('');
        dialogRef.current?.close();
    };

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
        handleClose();
    }

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

        handleClose();
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
            return (<li key={idx} style={{paddingRight: ".5rem"}}>
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

    /**
     * Toggles between the search and saved location tabs.
     * 
     * @param event - The event that triggered the toggle.
     */
    const toggleTabs = (event: React.MouseEvent) => {
        const tabs = document.querySelectorAll("#locationTabs button");

        tabs.forEach(tab => tab.classList.toggle("active"));

        const sections = document.querySelectorAll("section.search, section.saved");
        sections.forEach(section => section.classList.toggle("active"));
    }

    /**
     * Returns the page header with currentLocation data.
     * 
     * @returns {JSX}
     */
    const getPageHeader = () => {
        if (currentLocation) {
            return (
                <h1>{currentLocation.display_name.split(",")[0]},  {currentLocation.display_name.split(",")[2]}</h1>
            );
        }
    }

    return (
        <div id="locationHeader">

            {getPageHeader()}

            <button className="locationOpen" onClick={openLocationSearch}>+</button>

            <dialog ref={dialogRef}>
                <button className="cancelBtn" onClick={handleClose}>X</button>

                <div id="locationTabs" onClick={toggleTabs}>
                    <button className="active">Add Location</button> |
                    <button>Saved Locations</button>
                </div>

                {/* Add Location */}
                <section className="search active">
                    <form onSubmit={handleSearch}>
                        <div className="search-fields">
                            <input name="zipcode" type="text" placeholder="Zip Code" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} aria-describedby="location-error" />
                            <button className="btn_primary" type="submit">Search</button>
                        </div>
                        <div>
                            {searchError &&
                                <span id="location-error">Please enter a valid location.</span>
                            }
                        </div>
                    </form>
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
                <section className="saved" style={{width: "98%"}}>
                    <div style={{overflowX: "hidden", height: "220px"}}>
                        <ul className='results'>{savedLocationRows()}</ul>
                    </div>
                </section>

            </dialog>
        </div>
    );
}

export default LocationHeader
