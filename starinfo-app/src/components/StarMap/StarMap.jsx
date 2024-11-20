import React, {useEffect, useState} from 'react';
import './StarMap.css';
import Head from "../layout/Head";
import ConstellationPopup from './ConstellationPopup';
import axios from 'axios';
import useUserLocation from "../../hooks/useUserLocation";
import {useAuth} from "../../services/AuthProvider";

function StarMap() {
    const [constellationData, setConstellationData] = useState(null);
    const [error, setError] = useState(null);
    const [dataLoading, setDataLoading] = useState(true); // 별자리 데이터를 불러오는 로딩 상태 추가
    const {location, isLoading} = useUserLocation(); // 위치 정보를 가져오는 로딩 상태
    const {isAuthenticated, user} = useAuth(); // 로그인 상태와 사용자 정보 확인

    const [popupInfo, setPopupInfo] = useState({isVisible: false, constellationId: '', position: {x: 0, y: 0}});
    const [newSelection, setNewSelection] = useState(null); // 새로운 별자리 선택을 위한 상태

    // 현재 날짜를 "YYYY-MM-DD" 형식으로 가져오는 함수
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // 한 달 후 날짜를 "YYYY-MM-DD" 형식으로 가져오는 함수
    const getOneMonthLaterDate = () => {
        const today = new Date();
        today.setMonth(today.getMonth() + 1);
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // 별자리 데이터를 가져오는 useEffect
    useEffect(() => {
        console.log('StarMap - useEffect 실행됨. isLoading 상태:', isLoading);
        if (isLoading || !location) {
            console.log('위치 정보가 아직 설정되지 않았거나 로딩 중입니다.');
            return;
        }

        const fetchData = async () => {
            try {
                setDataLoading(true); // 데이터 로딩 시작
                const today = getTodayDate();
                const oneMonthLater = getOneMonthLaterDate();
                const url = `/constellations`;
                console.log(`API 요청 경로: ${url}, 위치:`, location);
                const response = await axios.get(url, {
                    params: {
                        latitude: location.latitude,
                        longitude: location.longitude,
                        startDate: today,
                        endDate: oneMonthLater, //today,
                        // 한달 요청으로 바꾸려면 위의 endDate를 바꾸세요.
                    },
                });
                console.log('별자리 데이터 응답:', response.data);
                setConstellationData(response.data);
            } catch (err) {
                setError(err);
                console.error('별자리 데이터 가져오기 오류:', err);
            } finally {
                setDataLoading(false); // 데이터 로딩 종료
            }
        };

        fetchData();
    }, [location, isLoading]);

    // 아래는 완전 화면
    const closePopup = () => {
        setPopupInfo({isVisible: false, constellationId: '', position: {x: 0, y: 0}});
    };

    // 별자리 다이어그램을 그리는 useEffect
    useEffect(() => {
         if (!document.getElementById("star-container")) {
            console.error("스타맵 컨테이너를 찾을 수 없습니다.");
        }
    }, [constellationData]);  // 별자리 데이터와 다이어그램 상태에 의존

    const handleClick = (event) => {
        const constellationElement = event.target.closest('.constellation');
        if (constellationElement) {
            const constellationId = constellationElement.id;

            if (popupInfo.constellationId === constellationId) {
                // 같은 별자리를 다시 클릭하면 팝업을 닫기
                setPopupInfo({isVisible: false, constellationId: '', position: {x: 0, y: 0}});
            } else {
                // 다른 별자리를 클릭하면 일단 현재 팝업을 닫고, 새로운 선택을 설정
                setPopupInfo((prev) => ({...prev, isVisible: false}));
                setNewSelection({constellationId, x: event.clientX, y: event.clientY});
            }
        }
    };

    useEffect(() => {
        if (!popupInfo.isVisible && newSelection) {
            // 애니메이션 지연 후에 새로운 팝업 표시
            const timer = setTimeout(() => {
                setPopupInfo({
                    isVisible: true,
                    constellationId: newSelection.constellationId,
                    position: {x: newSelection.x, y: newSelection.y}
                });
                setNewSelection(null);
            }, 0);

            return () => clearTimeout(timer);
        }
    }, [popupInfo.isVisible, newSelection]);

    // 로딩 상태에 따라 화면을 조건부로 렌더링
    return (
        <>
                <>
                    <div className="header">
                        <Head/>
                    </div>
                    <div className="content-wrapper">
                        <div className="stars-background"></div>
                        <div className="stars-container" onClick={handleClick}>
                            <svg
                                viewBox="0 0 1000 1000"
                                preserveAspectRatio="xMidYMid meet"
                                style={{
                                    isolation: "isolate",
                                    width: "75%", // Set width to 100% to make it responsive
                                    height: "auto",    // Maintain aspect ratio based on width
                                    margin: "120 auto 80",
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                id="star-container"
                            >
                                <g className="constellations">
                                    <g className="constellation" id="pegasus">
                                        <path
                                            d=" M 256 139 L 290 95 L 356.738 93 L 403 106 L 524 95 L 512 168 L 554 182 L 584.939 217 L 629 274 M 403 106 L 419 174 L 394 192 M 419 174 L 512 168 L 548 197 L 566 226 L 566 281"
                                            fill="none" stroke="rgb(255,255,255)"/>
                                        <text transform="matrix(1,0,0,1,429.314,143.931)" className="title">Pegasus
                                        </text>
                                    </g>
                                    <g className="constellation" id="taurus">
                                        <path
                                            d=" M 872.016 460.251 L 872.016 356.133 L 869.459 343.628 L 864.344 327.259 L 857.131 336.412 L 857.131 343.457 L 853.261 349.425 Q 837.971 412.437 826.833 450.874"
                                            fill="none" stroke="rgb(255,255,255)"/>
                                        <text transform="matrix(1,0,0,1,877,409.964)" className="title">Taurus</text>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        {/* Render Popup Component */}
                        <ConstellationPopup
                            constellationId={popupInfo.constellationId}
                            isVisible={popupInfo.isVisible}
                            position={popupInfo.position}
                            closePopup={closePopup}
                        />
                    </div>
                </>
            )
        </>
    );
}

export default StarMap;
