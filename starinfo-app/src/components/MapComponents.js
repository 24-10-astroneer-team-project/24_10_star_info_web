// MapComponents.js

import { useRef, useState } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';
import { useGoogleMap } from '../hooks/useGoogleMap';
import './MapComponent.css';

// 외부에 상수로 라이브러리 배열을 정의
const libraries = ["places"];

const MapComponent = () => {
    const { location, setLocation } = useGoogleMap({ lat: 37.5665, lng: 126.9780 });
    const [marker, setMarker] = useState(null);
    const autocompleteRef = useRef(null);

    const handlePlaceSelected = () => {
        const place = autocompleteRef.current.getPlace();
        if (place && place.geometry && place.geometry.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            const newLocation = { lat, lng };
            setLocation(newLocation);
            setMarker(newLocation); // 마커 위치 업데이트
        }
    };

    const handleMapClick = (event) => {
        // 클릭한 위치의 위도와 경도를 가져옴
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        const clickedLocation = { lat, lng };
        setLocation(clickedLocation); // 지도의 중심 위치 업데이트
        setMarker(clickedLocation); // 클릭한 위치에 마커 생성
    };

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY} libraries={libraries}>
            <GoogleMap
                center={location}
                zoom={15}
                mapContainerStyle={{ height: "400px", width: "100%" }}
                mapContainerClassName="google-map-container" // CSS 클래스 적용
                onClick={handleMapClick}
            >
                <Autocomplete
                    onLoad={autocomplete => autocompleteRef.current = autocomplete}
                    onPlaceChanged={handlePlaceSelected}
                    fields={['address_components', 'geometry']}
                >
                    <input
                        type="text"
                        placeholder="검색할 장소를 입력하세요"
                        className="autocomplete-input" // CSS 클래스 확인
                    />
                </Autocomplete>
                {marker && <Marker position={marker} />}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
