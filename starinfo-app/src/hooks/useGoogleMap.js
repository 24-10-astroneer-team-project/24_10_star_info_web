// useGoogleMap.js

import { useState } from 'react';
import { loadPlaceDetails } from '../services/googleMapsService';

// Google Map 사용자 지정 Hook
export const useGoogleMap = (initialLocation) => {
    const [location, setLocation] = useState(initialLocation);

    // 장소 변경 이벤트 핸들러
    const handlePlaceChanged = (autocomplete) => {
        loadPlaceDetails(autocomplete, setLocation);
    };

    return { location, setLocation, handlePlaceChanged }; // setLocation 추가
};

export default useGoogleMap;