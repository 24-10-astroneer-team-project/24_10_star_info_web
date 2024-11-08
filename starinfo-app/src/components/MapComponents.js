// MapComponents.js

import { useRef, useState } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';
import { useGoogleMap } from '../hooks/useGoogleMap';
import { sendLocationToServer } from '../services/LocationService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './MapComponent.css';

// 외부에 상수로 라이브러리 배열을 정의
const libraries = ["places"];

const MapComponent = () => {
    const { location, setLocation } = useGoogleMap({ lat: 37.5665, lng: 126.9780 });
    const [marker, setMarker] = useState(null);
    const autocompleteRef = useRef(null);
    const navigate = useNavigate(); // 이름을 'history'에서 'navigate'로 변경

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
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        const clickedLocation = { lat, lng };
        setLocation(clickedLocation); // 지도의 중심 위치 업데이트
        setMarker(clickedLocation); // 클릭한 위치에 마커 생성
    };


    const handleSubmit = async () => {
        if (marker) {
            console.log('Sending location to server:', marker);
            try {
                const response = await sendLocationToServer(marker);
                console.log('Location saved:', response.data); // 성공적으로 저장된 후의 처리

                toast.success('페이지 이동중..', {
                    position: "top-center",
                    autoClose: 2000, // 2초 후 자동 닫힘
                    style: {
                        zIndex: 9999, // 다른 요소보다 높게 설정
                    },
                });
                // 알림이 닫힌 후 리디렉션
                setTimeout(() => {
                    navigate('추후 수정 예정.'); // 리디렉션할 경로
                }, 2000);
            } catch (error) {
                toast.error('위치 정보를 서버로 보내는데 실패했습니다.', {
                    position: "top-center",
                    autoClose: 3000,
                    style: {
                        zIndex: 9999, // 다른 요소보다 높게 설정
                    },
                });
                console.error('Error sending location to server:', error);
            }
        } else {
            toast.warn('관측 위치를 선택해주세요.', {
                position: "top-center",
                autoClose: 3000,
                style: {
                    zIndex: 9999, // 다른 요소보다 높게 설정
                },
            });
        }
    };

    const saveHandleSubmit = async () => {
        if (marker) {
            console.log('Sending location to server:', marker); // userId 없이 marker 데이터만 전송
            try {
                const response = await sendLocationToServer(marker);
                console.log('Location saved:', response.data); // 성공적으로 저장된 후의 처리
                // 성공 알림 표시
                toast.success('위치 저장 성공!', {
                    position: "top-center",
                    autoClose: 2000, // 2초 후 자동 닫힘
                    style: {
                        zIndex: 9999, // 다른 요소보다 높게 설정
                    },
                });
                // 알림이 닫힌 후 리디렉션
                setTimeout(() => {
                    navigate('/react/main'); // 리디렉션할 경로
                }, 2000);
            } catch (error) {
                if (error instanceof Error && error.message === 'Unauthorized') {
                    toast.warn('관측 위치 저장은 로그인부터 해주세요.', {
                        position: "top-center",
                        autoClose: 3000,
                        style: {
                            zIndex: 9999, // 다른 요소보다 높게 설정
                        },
                    });
                    // 알림이 닫힌 후 리디렉션
                    setTimeout(() => {
                        navigate('/react/login'); // 리디렉션할 경로
                    }, 2000);
                } else {
                    alert('위치 정보를 서버로 보내는데 실패했습니다.');
                }
            }
        } else {
            toast.warn('관측 위치를 선택해주세요.', {
                position: "top-center",
                autoClose: 3000,
                style: {
                    zIndex: 9999, // 다른 요소보다 높게 설정
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
