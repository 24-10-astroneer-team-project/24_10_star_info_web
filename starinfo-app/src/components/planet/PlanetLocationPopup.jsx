// PlanetLocationPopup.jsx

import React from 'react';
import './css/PlanetLocationPopup.css';

// 방위각을 한글로 변환하는 함수
const getKoreanDirection = (azimuth) => {
    const directions = {
        West: "서쪽",
        East: "동쪽",
        North: "북쪽",
        South: "남쪽",
        Southwest: "남서쪽",
        Southeast: "남동쪽",
        Northwest: "북서쪽",
        Northeast: "북동쪽",
    };
    return directions[azimuth] || azimuth;
};

// 가시성을 한글로 변환하는 함수
const getKoreanVisibility = (visibility) => {
    const visibilityTranslations = {
        "Good visibility - The planet is high in the sky and it's dark enough for easy observation.":
            "관측 최적 - 행성의 고도가 높으며 주변이 어둡습니다.",
        "Difficult to observe - The planet is visible, but it is low in the sky, making it harder to see.":
            "관측 어려움 - 행성의 고도가 낮습니다",
        "Difficult to observe - The planet is high, but daylight might make it challenging to see.":
            "관측 힘듦 - 행성의 고도가 높지만 태양빛으로 인해 관측이 어렵습니다.",
        "Not recommended - The planet is low in the sky and daylight makes it very hard to observe.":
            "관측 비추천 - 행성의 고도가 낮으며 태양빛으로 인해 관측이 매우 어렵습니다.",
        "No optimal observation time available.":
            "관측에 적합한 시간이 없습니다.",
    };
    return visibilityTranslations[visibility] || visibility;
};

const PlanetLocationPopup = ({ planetName, planetData, onClose }) => {
    if (!planetData || planetData.length === 0) return null;

    // 기준 시간 정보 가져오기 (첫 번째 데이터의 timeZoneId 사용)
    const timeZoneId = planetData[0]?.timeZoneId || '정보 없음';

    // 팝업 외부 클릭을 처리하는 함수
    const handleOverlayClick = (e) => {
        if (e.target.className === 'popup-overlay_planet') {
            onClose();
        }
    };

    return (
        <div className="popup-overlay_planet" onClick={handleOverlayClick}>
            <div className="popup-container_planet">
                <button className="popup-close-button" onClick={onClose}>
                    ✕
                </button>
                <h2>{planetName} Data</h2>
                <p className="time-zone"><strong>기준 시간:</strong> {timeZoneId}</p>
                <table className="planet-data-table">
                    <thead>
                    <tr>
                        <th>날짜</th>
                        <th>최고 고도</th>
                        <th>지구와의 거리</th>
                        <th>방위각</th>
                        <th>최적 관측 시간</th>
                        <th>가시성</th>
                    </tr>
                    </thead>
                    <tbody>
                    {planetData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.date}</td>
                            <td>{data.altitude}</td>
                            <td>{data.distance_to_earth}</td>
                            <td>{getKoreanDirection(data.azimuth)}</td>
                            <td>{data.best_time}</td>
                            <td>{getKoreanVisibility(data.visibility_judgment)}</td> {/* 번역된 가시성 */}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlanetLocationPopup;
