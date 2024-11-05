//googleMapsService.js

// 장소 상세 정보를 로드하는 함수
export const loadPlaceDetails = (autocomplete, setLocation) => {
    const place = autocomplete.getPlace();
    if (place && place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setLocation({ lat, lng }); // 상태 업데이트
    } else {
        console.error("No place details available.");
    }
};