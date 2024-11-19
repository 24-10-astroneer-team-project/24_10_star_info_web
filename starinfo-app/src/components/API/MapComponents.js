// MapComponents.js

import {useRef, useState, useEffect} from 'react';
import {Autocomplete, GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import {useNavigate, useLocation} from 'react-router-dom';
import {toast} from 'react-toastify';
import './MapComponent.css';
import {sendLocationToServer} from "../../services/LocationService";
import useGoogleMap from "../../hooks/useGoogleMap";

// 외부에 상수로 라이브러리 배열을 정의
const libraries = ["places"];

const MapComponent = () => {
    const { location, setLocation } = useGoogleMap({ lat: 37.5665, lng: 126.9780 });
    const [marker, setMarker] = useState(null);
    const autocompleteRef = useRef(null);
    const navigate = useNavigate();
    const locationRef = useLocation();
    const [isSaved, setIsSaved] = useState(false);

    // 상태와 위치 참조 값, 그리고 리렌더링 시 동작을 추적하기 위한 로그 추가
    console.log('Rendering MapComponent');
    console.log('Current isSaved state:', isSaved);
    console.log('locationRef:', JSON.stringify(locationRef, null, 2));

    useEffect(() => {
        if (isSaved) {
            console.log('isSaved is true, triggering toast and starting redirection');

            // 먼저 토스트 알림을 띄움
            toast.success('위치 저장 성공!', {
                position: "top-center",
                autoClose: 3000,
                style: {
                    zIndex: 9999,
                },
            });

            // 리디렉션을 바로 실행하지 않고, 토스트 알림 후에 실행
            setTimeout(() => {
                if (locationRef.state?.from) {
                    navigate(locationRef.state.from);
                } else {
                    navigate('/react/main');
                }
            }, 3000);

            // 상태 초기화
            setIsSaved(false);
        }
    }, [isSaved, locationRef.state, navigate]);

    const handlePlaceSelected = () => {
        const place = autocompleteRef.current.getPlace();
        if (place && place.geometry && place.geometry.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            const newLocation = { lat, lng };
            setLocation(newLocation);
            setMarker(newLocation);
            console.log('New location selected:', newLocation);
        }
    };

    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        const clickedLocation = { lat, lng };
        setLocation(clickedLocation);
        setMarker(clickedLocation);
        console.log('Map clicked, new marker set at:', clickedLocation);
    };


    const handleSubmit = async () => {
        if (marker) {
            console.log('Sending location to server:', marker);
            try {
                const response = await sendLocationToServer(marker);
                console.log('Location saved:', response.data); // 성공적으로 저장된 후의 처리

                // 저장 성공 후 토스트 알림을 표시하고 리디렉션
                toast.success('위치 정보가 저장되었습니다. 메인 페이지로 이동합니다.', {
                    position: "top-center",
                    autoClose: 2000, // 2초 후 자동 닫힘
                    style: {
                        zIndex: 9999, // 다른 요소보다 높게 설정
                    },
                    onClose: () => navigate('/react/main'), // 알림이 닫힐 때 리디렉션
                });

            } catch (error) {
                toast.error('위치 정보를 서버로 보내는 데 실패했습니다.', {
                    position: "top-center",
                    autoClose: 3000,
                    style: {
                        zIndex: 9999,
                    },
                });
                console.error('Error sending location to server:', error);
            }
        } else {
            toast.warn('관측 위치를 선택해주세요.', {
                position: "top-center",
                autoClose: 3000,
                style: {
                    zIndex: 9999,
                },
            });
        }
    };

    const saveHandleSubmit = async () => {
        if (marker) {
            console.log('Starting saveHandleSubmit with marker:', marker);
            try {
                const response = await sendLocationToServer(marker);
                console.log('Location saved, server response:', response); // response 자체를 출력해 구조 확인

                setIsSaved(true); // 저장 성공 시 상태 업데이트
                console.log('setIsSaved called, isSaved:', isSaved);
            } catch (error) {
                console.error('Error saving location:', error);

                if (error instanceof Error && error.message === 'Unauthorized') {
                    toast.warn('관측 위치 저장은 로그인부터 해주세요.', {
                        position: "top-center",
                        autoClose: 3000,
                        style: {
                            zIndex: 9999,
                        },
                    });
                    setTimeout(() => {
                        navigate('/react/login');
                    }, 3000);
                } else {
                    alert('위치 정보를 서버로 보내는 데 실패했습니다.');
                }
            }
        } else {
            toast.warn('관측 위치를 선택해주세요.', {
                position: "top-center",
                autoClose: 3000,
                style: {
                    zIndex: 9999,
                },
            });
        }
    };

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY} libraries={libraries}>
            <GoogleMap
                center={location}
                zoom={15}
                mapContainerStyle={{height: "400px", width: "100%"}}
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
                {marker && <Marker position={marker}/>}

            </GoogleMap>
            <button onClick={handleSubmit} className="submit-button mt-3">검색</button>
            <button onClick={saveHandleSubmit} className="submit-button mt-3">내 위치로 저장</button>
        </LoadScript>
    );
};

export default MapComponent;