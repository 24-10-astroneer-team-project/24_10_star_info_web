import { useState } from 'react';
import { loadPlaceDetails } from '../services/googleMapsService';

export const useGoogleMap = (initialLocation) => {
    const [location, setLocation] = useState(initialLocation);

    const handlePlaceChanged = (autocomplete) => {
        loadPlaceDetails(autocomplete, setLocation);
    };

    return { location, handlePlaceChanged };
};