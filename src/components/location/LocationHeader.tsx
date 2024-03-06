import React, { useContext, useState } from 'react';
import { CurrentLocationContext } from '../../context/CurrentLocationContext';
import LocationDialog from './LocationDialog';

/**
 * The header component for the location.
 * 
 * @returns The rendered JSX elements.
 */
function LocationHeader() {
    const { currentLocation } = useContext(CurrentLocationContext);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openLocationDialog = () => {
        setIsDialogOpen(true);
    }

    const closeLocationDialog = () => {
        setIsDialogOpen(false);
    }

    /**
     * Returns the page header with currentLocation data.
     * 
     * @returns {JSX}
     */
    const getPageHeader = (): JSX.Element => {
        if (!currentLocation) return <h1>Unknown Location</h1>;

        const city = currentLocation.display_name.split(",")[0];
        const state = currentLocation.display_name.split(",")[2];

        return (
            <h1>{city}, {state}</h1>
        );
    }

    return (
        <div id="locationHeader">
            {getPageHeader()}
            <button className="locationOpen" onClick={openLocationDialog}>+</button>
            <LocationDialog
                isDialogOpen={isDialogOpen}
                closeLocationDialog={closeLocationDialog}
            />
        </div>
    );
}

export default LocationHeader
