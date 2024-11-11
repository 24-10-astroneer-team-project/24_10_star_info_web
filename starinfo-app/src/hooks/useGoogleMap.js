<<<<<<< HEAD
import { useState } from 'react';
import { loadPlaceDetails } from '../services/googleMapsService';

export const useGoogleMap = (initialLocation) => {
    const [location, setLocation] = useState(initialLocation);

=======
// useGoogleMap.js

import { useState } from 'react';
import { loadPlaceDetails } from '../services/googleMapsService';

// Google Map 사용자 지정 Hook
export const useGoogleMap = (initialLocation) => {
    const [location, setLocation] = useState(initialLocation);

    // 장소 변경 이벤트 핸들러
>>>>>>> d80e1566534f4463b772354c317430220515fb47
    const handlePlaceChanged = (autocomplete) => {
        loadPlaceDetails(autocomplete, setLocation);
    };

<<<<<<< HEAD
    return { location, handlePlaceChanged };
=======
    return { location, setLocation, handlePlaceChanged }; // setLocation 추가
>>>>>>> d80e1566534f4463b772354c317430220515fb47
};
