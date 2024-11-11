//googleMapsService.js


export const loadPlaceDetails = (autocomplete, setLocation) => {
    if (autocomplete) {
        const place = autocomplete.getPlace();
        if (place && place.geometry && place.geometry.location) { // geometry 속성 확인
            const { lat, lng } = place.geometry.location;
            setLocation({ lat: lat(), lng: lng() });
        } else {
            console.error("No place details available.");
        }
    }
};

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

