// React 및 외부 라이브러리 컴포넌트 가져오기

import { useState, useEffect } from 'react';
import { Autocomplete, GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import './MapComponent.css';
import { sendLocationToServer } from '../../services/LocationService';
import useGoogleMap from '../../hooks/useGoogleMap';
import Head from "../layout/Head";
import Foot from "../layout/Foot";
import './StarBackground.scss';

const libraries = ["places"];

const MapComponent = () => {
    // useGoogleMap에서 상태와 함수를 가져오기
    const {
        location,
        marker,
        editingMarker,
        setEditingLocation,
        handlePlaceSelected,
        handleMapClick,
        autocompleteRef,
        markerRef,
    } = useGoogleMap({ lat: 37.5665, lng: 126.9780 });

    const [description, setDescription] = useState(""); // 위치 설명
    const [isEditing, setIsEditing] = useState(false); // 수정 여부 상태
    const [editingLocationId, setEditingLocationId] = useState(null); // 수정 중인 ID
    const navigate = useNavigate(); // 페이지 이동용 함수
    const locationRef = useLocation(); // 현재 경로 및 상태 참조
    const [isSaved, setIsSaved] = useState(false); // 저장 상태

    useEffect(() => {
        console.log("Received location state:", locationRef.state);
        if (locationRef.state?.isEditing) {
            console.log("Editing mode detected");
            setEditingLocationId(locationRef.state.locationId);
            setIsEditing(true);
            setEditingLocation(locationRef.state.latitude, locationRef.state.longitude);
            setDescription(locationRef.state.description || "");
        }
    }, [locationRef]);

    // 저장/수정 완료 시 토스트 메시지와 페이지 이동 처리
    useEffect(() => {
        if (isSaved) {
            const message = isEditing
                ? '위치 수정 성공!'
                : '위치 저장 성공!';

            toast.success(message, {
                position: "top-center",
                autoClose: 3000,
                style: { zIndex: 9999 },
            });

            setTimeout(() => {
                if (locationRef.state?.from) {
                    navigate(locationRef.state.from);
                } else {
                    navigate('/react/main');
                }
            }, 3000);

            setIsSaved(false);
        }
    }, [isSaved, isEditing, locationRef.state, navigate]);


    // 위치 저장/수정 처리 함수
    const saveHandleSubmit = async () => {
        const targetMarker = markerRef.current; // 항상 최신 상태값 사용
        if (!targetMarker) {
            toast.warn('관측 위치를 선택해주세요.');
            return;
        }

        try {
            const payload = {
                id: isEditing ? editingLocationId : undefined, // 수정 모드일 경우 ID 포함
                ...targetMarker,
                description,
            };

            console.log('Submitting data:', payload, 'Is editing:', isEditing);

            const response = await sendLocationToServer(payload, isEditing);
            console.log(
                isEditing ? 'Location updated, server response:' : 'Location saved, server response:',
                response
            );

            toast.success(isEditing ? '위치 정보가 성공적으로 수정되었습니다!' : '위치 정보가 성공적으로 저장되었습니다!');
            setIsEditing(false);
            setEditingLocationId(null);
            setIsSaved(true);
        } catch (error) {
            console.error('Error saving/updating location:', error);
            toast.error('위치 정보를 저장/수정하는 데 실패했습니다.');
        }
    };


    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <Head />

            <div id="star-background">
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
            </div>

            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
                libraries={libraries}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                        gap: "10px",
                    }}
                >
                    <GoogleMap
                        center={location}
                        zoom={15}
                        mapContainerStyle={{
                            height: "70%",
                            width: "80%",
                            borderRadius: "8px",
                            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                        }}
                        onClick={handleMapClick}
                    >
                        <Autocomplete
                            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                            onPlaceChanged={handlePlaceSelected}
                            fields={['address_components', 'geometry']}
                        >
                            <input
                                type="text"
                                placeholder="검색할 장소를 입력하세요"
                                className="autocomplete-input"
                            />
                        </Autocomplete>
                        {marker && <Marker position={marker} />}
                        {editingMarker && (
                            <Marker
                                position={editingMarker}
                                icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
                            />
                        )}
                    </GoogleMap>
                    <div className="map-actions">
                        <div className="save-with-description">
                            <input
                                type="text"
                                placeholder="위치 설명을 입력하세요"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="description-input-field"
                            />
                            <button onClick={saveHandleSubmit} className="submit-button">
                                {isEditing ? "위치 수정" : "내 위치로 저장"}
                            </button>
                        </div>
                    </div>
                </div>
            </LoadScript>

            <Foot />
        </div>
    );
};

export default MapComponent;
