// React 및 외부 라이브러리 컴포넌트 가져오기
import { useRef, useState, useEffect } from 'react'; // React 훅들: useRef, useState, useEffect
import { Autocomplete, GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; // Google Maps API 컴포넌트
import { useNavigate, useLocation } from 'react-router-dom'; // React Router 훅들
import { toast } from 'react-toastify'; // 사용자 알림 토스트 메시지 라이브러리
import './MapComponent.css'; // CSS 스타일 파일
import { sendLocationToServer } from '../../services/LocationService'; // 서버로 위치 데이터를 전송하는 서비스 함수
import useGoogleMap from '../../hooks/useGoogleMap'; // Google Map 관련 상태를 관리하는 커스텀 훅
import Head from "../layout/Head"; // 헤더 컴포넌트 추가
import Foot from "../layout/Foot"; // 푸터 컴포넌트 추가
import './StarBackground.scss'; // Sass로 작성된 별 배경

// Google Maps API에서 사용할 라이브러리 설정 (places는 Autocomplete 기능 활성화를 위한 필수 라이브러리)
const libraries = ["places"];

// MapComponent 컴포넌트 정의
const MapComponent = () => {

    // 커스텀 훅에서 기본 위치와 상태 업데이트 함수 가져오기
    const { location, setLocation } = useGoogleMap({ lat: 37.5665, lng: 126.9780 }); // 기본 위치: 서울
    const [marker, setMarker] = useState(null); // 마커 상태 (선택한 위치를 저장)
    const autocompleteRef = useRef(null); // Autocomplete 인스턴스를 참조하기 위한 ref
    const navigate = useNavigate(); // 페이지 이동을 위한 함수
    const locationRef = useLocation(); // 현재 페이지와 관련된 상태 및 경로 정보를 가져오는 함수
    const [isSaved, setIsSaved] = useState(false); // 위치 저장 여부 상태
    const [description, setDescription] = useState(""); // 위치 설명 입력 상태

    // 위치 저장이 완료되었을 때 실행되는 효과
    useEffect(() => {
        if (isSaved) {
            console.log('isSaved is true, triggering toast and starting redirection');
            // 위치 저장 성공 메시지 출력
            toast.success('위치 저장 성공!', {
                position: "top-center", // 화면 상단 중앙에 표시
                autoClose: 3000, // 3초 후 자동 닫힘
                style: { zIndex: 9999 }, // 다른 요소보다 위에 표시
            });

            // 3초 후 페이지 리디렉션
            setTimeout(() => {
                if (locationRef.state?.from) {
                    navigate(locationRef.state.from); // 이전 경로로 이동
                } else {
                    navigate('/react/main'); // 기본 메인 경로로 이동
                }
            }, 3000);

            setIsSaved(false); // 상태 초기화
        }
    }, [isSaved, locationRef.state, navigate]);

    // Autocomplete에서 장소 선택 시 실행되는 함수
    const handlePlaceSelected = () => {
        const place = autocompleteRef.current.getPlace(); // 선택된 장소 정보 가져오기
        if (place && place.geometry && place.geometry.location) {
            const lat = place.geometry.location.lat(); // 위도 추출
            const lng = place.geometry.location.lng(); // 경도 추출
            const newLocation = { lat, lng }; // 새로운 위치 객체 생성
            setLocation(newLocation); // 지도 중심 위치 업데이트
            setMarker(newLocation); // 마커 위치 설정
            console.log('New location selected:', newLocation); // 디버깅 로그
        }
    };

    // 사용자가 지도 클릭 시 실행되는 함수
    const handleMapClick = (event) => {
        const lat = event.latLng.lat(); // 클릭된 위치의 위도
        const lng = event.latLng.lng(); // 클릭된 위치의 경도
        const clickedLocation = { lat, lng }; // 클릭된 위치 객체 생성
        setLocation(clickedLocation); // 지도 중심 위치 업데이트
        setMarker(clickedLocation); // 마커 위치 설정
        console.log('Map clicked, new marker set at:', clickedLocation); // 디버깅 로그
    };

    // 마커 정보를 서버로 전송하는 함수
    const handleSubmit = async () => {
        if (marker) { // 마커가 설정된 경우
            console.log('Sending location to server:', marker); // 디버깅 로그
            try {
                const response = await sendLocationToServer(marker); // 서버로 위치 데이터 전송
                console.log('Location saved:', response.data); // 서버 응답 출력

                // 저장 성공 메시지 출력 및 페이지 이동
                toast.success('위치 정보가 저장되었습니다. 메인 페이지로 이동합니다.', {
                    position: "top-center", // 상단 중앙
                    autoClose: 2000, // 2초 후 닫힘
                    style: { zIndex: 9999 }, // UI 위에 표시
                    onClose: () => navigate('/react/main'), // 닫힐 때 메인 페이지로 이동
                });
            } catch (error) {
                // 저장 실패 메시지 출력
                toast.error('위치 정보를 서버로 보내는 데 실패했습니다.', {
                    position: "top-center", // 상단 중앙
                    autoClose: 3000, // 3초 후 닫힘
                    style: { zIndex: 9999 },
                });
                console.error('Error sending location to server:', error); // 에러 로그 출력
            }
        } else {
            // 마커가 없는 경우 경고 메시지 출력
            toast.warn('관측 위치를 선택해주세요.', {
                position: "top-center",
                autoClose: 3000,
                style: { zIndex: 9999 },
            });
        }
    };

    // 위치와 설명 정보를 서버로 전송하는 함수
    const saveHandleSubmit = async () => {
        if (marker) { // 마커가 설정된 경우
            console.log('Starting saveHandleSubmit with marker:', marker); // 디버깅 로그
            try {
                const response = await sendLocationToServer({
                    ...marker, // 마커 위치 정보
                    description, // 입력된 설명
                });
                console.log('Location saved, server response:', response); // 서버 응답 로그

                setIsSaved(true); // 저장 성공 상태 설정
            } catch (error) {
                console.error('Error saving location:', error); // 에러 로그 출력

                if (error instanceof Error && error.message === 'Unauthorized') {
                    // 인증되지 않은 경우 경고 메시지 및 로그인 페이지 이동
                    toast.warn('관측 위치 저장은 로그인부터 해주세요.', {
                        position: "top-center",
                        autoClose: 3000,
                        style: { zIndex: 9999 },
                    });
                    setTimeout(() => {
                        navigate('/react/login'); // 로그인 페이지로 이동
                    }, 3000);
                } else {
                    alert('위치 정보를 서버로 보내는 데 실패했습니다.'); // 알림 메시지 출력
                }
            }
        } else {
            // 마커가 없는 경우 경고 메시지 출력
            toast.warn('관측 위치를 선택해주세요.', {
                position: "top-center",
                autoClose: 3000,
                style: { zIndex: 9999 },
            });
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <Head /> {/* 헤더 컴포넌트 추가 */}

            {/* 별 배경 애니메이션 */}
            <div id="star-background">
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
            </div>

            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY} libraries={libraries}>
                <div style={{
                    display: "flex",
                    flexDirection: "column", // 세로 방향
                    justifyContent: "center", // 세로 중앙 정렬
                    alignItems: "center", // 가로 중앙 정렬
                    height: "100vh", // 화면 전체 높이 사용
                    gap: "10px", // 지도와 버튼 간격 최소화
                }}>
                    <GoogleMap
                        center={location}
                        zoom={15}
                        mapContainerStyle={{
                            height: "70%", // 지도 높이 조정
                            width: "80%", // 양옆 여백 추가
                            borderRadius: "8px",
                            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                            position: "relative",
                            zIndex: 1, // 지도 z-index 설정
                            marginTop: "100px", // 지도 아래로 20px 내리기
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
                                내 위치로 저장
                            </button>
                        </div>
                    </div>
                </div>
            </LoadScript>

            {/* 푸터 */}
            <Foot />
        </div>
    );
};

export default MapComponent;
