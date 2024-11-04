import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';
import { useGoogleMap } from '../hooks/useGoogleMap';

const MapComponent = () => {
    const { location, handlePlaceChanged } = useGoogleMap({ lat: 37.5665, lng: 126.9780 }); // 기본 서울 위치

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY} libraries={["places"]}>
            <GoogleMap center={location} zoom={10} mapContainerStyle={{ height: "400px", width: "100%" }}>
                <Autocomplete onLoad={(autocomplete) => handlePlaceChanged(autocomplete)} >
                    <input type="text" placeholder="검색할 장소를 입력하세요" />
                </Autocomplete>
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
