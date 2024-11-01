//googleMapsService.js

export const loadPlaceDetails = (autocomplete, setLocation) => {
    if (autocomplete) {
        const place = autocomplete.getPlace();
        const { lat, lng } = place.geometry.location;
        setLocation({ lat: lat(), lng: lng() });
    }
};
