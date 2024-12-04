// useGoogleMap.js

import { useState, useRef } from 'react';

export const useGoogleMap = (initialLocation = { lat: 0, lng: 0 }, isEditing = false) => {
    const [location, setLocation] = useState(initialLocation); // 지도 중심 상태
    const [marker, setMarker] = useState(initialLocation); // 마커 상태
    const [editingMarker, setEditingMarker] = useState(initialLocation); // 수정 중인 마커 상태
    const autocompleteRef = useRef(null); // Autocomplete 인스턴스를 참조하기 위한 ref
    const markerRef = useRef(initialLocation);

    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        const clickedLocation = { lat, lng };

        if (isEditing) {
            setEditingLocation(lat, lng);
            markerRef.current = clickedLocation; // 최신 상태 반영
            console.log('Editing marker set:', markerRef.current);
        } else {
            setLocation(clickedLocation);
            setMarker(clickedLocation);
            markerRef.current = clickedLocation; // 최신 상태 반영
            console.log('New marker set:', markerRef.current);
        }
    };

    // 장소 변경 이벤트 핸들러
    const handlePlaceSelected = () => {
        const place = autocompleteRef.current?.getPlace();
        if (place?.geometry?.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            const newLocation = { lat, lng };

            if (isEditing) {
                setEditingMarker(newLocation);
            } else {
                setMarker(newLocation);
            }

            setLocation(newLocation);
            markerRef.current = newLocation; // 최신 상태 반영
            console.log("Updated markerRef after place selected:", markerRef.current);
        } else {
            console.error("No valid geometry found for the selected place.");
        }
    };


    // 수정 중인 위치 설정
    const setEditingLocation = (lat, lng) => {
        const newEditingMarker = { lat, lng };
        setEditingMarker(newEditingMarker);
        setLocation(newEditingMarker);
        console.log('Set Editing Location:', newEditingMarker);
    };

    return {
        location,
        setLocation,
        marker,
        setMarker,
        editingMarker,
        setEditingLocation,
        handlePlaceSelected,
        handleMapClick,
        autocompleteRef, // Autocomplete 인스턴스 ref 반환
        markerRef,
    };
};

export default useGoogleMap;
