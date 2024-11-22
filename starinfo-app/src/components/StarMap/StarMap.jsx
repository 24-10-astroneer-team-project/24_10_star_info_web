import React, {useEffect, useState} from 'react';
import './css/StarMap.css';
import Head from "../layout/Head";
import Foot from "../layout/Foot";
import {drawdiagram} from './Diagram';
import ConstellationPopup from './ConstellationPopup';
import LoadingSpinner from '../ui/LoadingSpinner';

import axios from 'axios';
import useUserLocation from "../../hooks/useUserLocation";
import {useAuth} from "../../services/AuthProvider";

import UserLocationButton from './UserLocationButton';

function StarMap() {
    const [constellationData, setConstellationData] = useState(null);
    const [error, setError] = useState(null);
    const [dataLoading, setDataLoading] = useState(true); // 별자리 데이터를 불러오는 로딩 상태 추가
    const {location, isLoading} = useUserLocation(); // 위치 정보를 가져오는 로딩 상태
    const {isAuthenticated, user} = useAuth(); // 로그인 상태와 사용자 정보 확인

    const [popupInfo, setPopupInfo] = useState({isVisible: false, constellationId: '', position: {x: 0, y: 0}});
    const [newSelection, setNewSelection] = useState(null); // 새로운 별자리 선택을 위한 상태

    const [diagramOn, setDiagramOn] = useState(false);
    const [isDiagramDrawn, setIsDiagramDrawn] = useState(false); // 다이어그램이 이미 그려졌는지 여부

    // 현재 날짜를 "YYYY-MM-DD" 형식으로 가져오는 함수
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // 한달치 날짜를 "YYYY-MM-DD" 형식으로 가져오는 함수
    const getOneMonthLaterDate = () => {
        const today = new Date();
        today.setMonth(today.getMonth() + 1);
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // 일주일치 날짜를 "YYYY-MM-DD" 형식으로 가져오는 함수
    const getOneWeekLaterDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 6); // 7일 후 날짜 계산
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
                //const oneMonthLater = getOneMonthLaterDate(); // 한달치 날짜 계산
                const oneMonthLater = getOneMonthLaterDate(); // 일주일치 날짜 계산
                const url = `/constellations`;
                console.log(`API 요청 경로: ${url}, 위치:`, location);
                const response = await axios.get(url, {
                    params: {
                        latitude: location.latitude,
                        longitude: location.longitude,
                        startDate: today,
                        endDate: oneMonthLater, // today,
                        // 한달 요청으로 바꾸려면 위의 endDate를 oneMonthLater로 바꾸기.
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
        // 별자리 데이터가 로드되고 나서 다이어그램을 그리도록 설정
        if (document.getElementById("star-container") && constellationData && !isDiagramDrawn) {
            requestAnimationFrame(() => {
                drawdiagram(diagramOn, setDiagramOn);
                setIsDiagramDrawn(true); // 다이어그램이 그려졌음을 표시
            });
        }
    }, [constellationData, isDiagramDrawn, diagramOn]);  // 별자리 데이터와 다이어그램 상태에 의존

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
            {isLoading || dataLoading ? (
                <LoadingSpinner/>
            ) : (
                <>
                    <div className="header">
                        <Head/>
                    </div>
                    <div className="content-wrapper">
                        <UserLocationButton/>
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
                                    <g className="constellation" id="orion">
                                        <path
                                            d=" M 947.038 429.561 L 989.663 440.644 M 947.038 429.561 L 932.545 455.136 L 948.743 490.942 M 991.368 462.809 L 948.743 490.942"
                                            fill="none" stroke="rgb(255,255,255)"/>
                                        <text transform="matrix(1,0,0,1,935.644,514.964)" className="title">Orion</text>
                                    </g>
                                </g>
                                <g className="months" id="months">
                                </g>
                                <g className="diagram" id="diagram">
                                    <path
                                        d="m417.73 500c0-45.405 36.863-82.268 82.268-82.268s82.268 36.863 82.268 82.268-36.863 82.268-82.268 82.268-82.268-36.863-82.268-82.268zm-83.12 0c0-91.28 74.108-165.39 165.39-165.39s165.39 74.108 165.39 165.39-74.108 165.39-165.39 165.39-165.39-74.108-165.39-165.39zm-78.858 0c0-134.8 109.44-244.25 244.25-244.25s244.25 109.44 244.25 244.25-109.44 244.25-244.25 244.25-244.25-109.44-244.25-244.25zm-83.12 0c0-180.68 146.69-327.37 327.37-327.37s327.37 146.69 327.37 327.37-146.69 327.37-327.37 327.37-327.37-146.69-327.37-327.37zm-76.726 0c0-223.02 181.07-404.09 404.09-404.09s404.09 181.07 404.09 404.09-181.07 404.09-404.09 404.09-404.09-181.07-404.09-404.09zm-95.908 0c0-275.96 224.04-500 500-500s500 224.04 500 500-224.04 500-500 500-500-224.04-500-500zm500-500v1e3m-500-500h1e3m-982.96-129.41 403.5 108.12m158.95 42.591 403.48 108.11m-965.93 0 403.5-108.12m158.95-42.591 403.48-108.11m-732.96 562.42 208.87-361.77m82.278-142.51 208.86-361.75m-379.41 915.98 108.12-403.5m42.591-158.95 108.11-403.48m-562.42 732.96 361.77-208.87m142.51-82.278 361.75-208.86m-786.57 603.55 295.38-295.38m116.36-116.36 295.37-295.37m0 707.11-295.38-295.38m-116.36-116.36-295.37-295.37m603.55 786.57-208.87-361.77m-82.278-142.51-208.86-361.75m379.41 915.98-108.12-403.5m-42.591-158.95-108.11-403.48m-303.6 232.96 361.77 208.87m142.51 82.278 361.75 208.86"
                                        stroke="#fff"/>
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
                    <div className="footer">
                        <Foot/>
                    </div>
                </>
            )}
        </>
    );
}

export default StarMap;
