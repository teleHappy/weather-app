import React, { useContext, useRef, useState } from 'react';
import { CurrentLocationContext } from '../context/CurrentLocationContext';
import LocationDialog from './location/Dialog';

/**
 * The header component for the location.
 * 
 * @returns The rendered JSX elements.
 */
function LocationHeader() {
    const { currentLocation } = useContext(CurrentLocationContext)
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    /**
     * Opens the location search dialog.
     */
    const openLocationSearch = () => {
        document.body.style.position = 'static';
        document.body.style.top = `-${window.scrollY}px`;
        dialogRef.current?.showModal();
    };

    /**
     * Closes the location search dialog.
     */
    const handleClose = () => {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        dialogRef.current?.close();
    };

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
                <LocationDialog handleClose={handleClose} />
            </dialog>
        </div>
    );
}

export default LocationHeader
