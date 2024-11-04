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
