// useGoogleMap.js

import { useState, useRef } from 'react';

export const useGoogleMap = (initialLocation = { lat: 0, lng: 0 }, isEditing = false) => {
    const [location, setLocation] = useState(initialLocation); // 지도 중심 상태
    const [marker, setMarker] = useState(initialLocation); // 마커 상태
    const [editingMarker, setEditingMarker] = useState(initialLocation); // 수정 중인 마커 상태
    const autocompleteRef = useRef(null); // Autocomplete 인스턴스를 참조하기 위한 ref
    const markerRef = useRef(initialLocation);

    // 장소 변경 이벤트 핸들러
    const handlePlaceSelected = () => {
        if (!autocompleteRef.current) {
            console.error("Autocomplete is not initialized");
            return;
        }

        const place = autocompleteRef.current.getPlace();
        if (place?.geometry?.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            const newLocation = { lat, lng };

            if (isEditing) {
                setEditingMarker(newLocation); // 수정 중인 위치 업데이트
            } else {
                setMarker(newLocation); // 마커 업데이트
            }

            setLocation(newLocation); // 지도 중심 이동
            console.log(
                isEditing
                    ? 'Editing location selected:'
                    : 'New location selected:',
                newLocation
            );
        }
    };

    // 지도 클릭 이벤트 핸들러
    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        const clickedLocation = { lat, lng };

        if (isEditing) {
            setEditingLocation(lat, lng); // 수정 중이라면 editingMarker 업데이트
            markerRef.current = { lat, lng }; // 최신 위치 업데이트
        } else {
            setLocation(clickedLocation); // 저장 중이라면 marker 업데이트
            setMarker(clickedLocation); // 새 마커 설정
            markerRef.current = clickedLocation; // 최신 위치 업데이트
        }
        console.log('New marker set:', clickedLocation);
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
