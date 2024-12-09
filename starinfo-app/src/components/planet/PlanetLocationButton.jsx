import React, { useState } from 'react';
import PlanetLocationPopup from './PlanetLocationPopup';
import './css/PlanetLocationButton.css';
import closeIcon from '../layout/asset/close_icon.png'; // 닫기 아이콘 경로
import starIcon from '../layout/asset/test.png'; // 최소화 팝업창 아이콘 경로

const PlanetLocationButton = ({ planetData, locationDescription }) => {
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [popupData, setPopupData] = useState(null);
    const [isMinimized, setIsMinimized] = useState(false); // 최소화 상태 관리

    // 행성을 클릭했을 때 실행되는 함수
    const handlePlanetClick = (planetName) => {
        if (planetData && planetData[planetName]) {
            setSelectedPlanet(planetName);
            setPopupData(planetData[planetName]);
        } else {
            console.warn(`${planetName} data is not available`);
        }
    };

    // 팝업 닫기 함수
    const closePopup = () => {
        setSelectedPlanet(null);
        setPopupData(null);
    };

    // 최소화 상태 토글
    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    // "N/A"가 아닌 데이터만 필터링
    const visiblePlanets = Object.keys(planetData).filter((planetName) => {
        const planetInfo = planetData[planetName];
        return planetInfo.some((data) => data.best_time !== "N/A");
    });

    // 행성 설명 데이터 (title 속성)
    const planetDescriptions = {
        Mercury: '사용자 위치에서 보이는 수성의 일주일 데이터입니다',
        Venus: '사용자 위치에서 보이는 금성의 일주일 데이터입니다',
        Mars: '사용자 위치에서 보이는 화성의 일주일 데이터입니다',
        Jupiter: '사용자 위치에서 보이는 목성의 일주일 데이터입니다',
        Saturn: '사용자 위치에서 보이는 토성의 일주일 데이터입니다',
        Uranus: '사용자 위치에서 보이는 천왕성의 일주일 데이터입니다',
        Neptune: '사용자 위치에서 보이는 해왕성의 일주일 데이터입니다',
    };

    // 최소화 상태일 경우
    if (isMinimized) {
        return (
            <div className="planet-popup-container minimized" onClick={toggleMinimize}>
                <img
                    src={starIcon}
                    alt="스타 아이콘"
                    className="star-icon"
                    title="클릭하면 팝업창의 최소화가 해제됩니다."
                />
            </div>
        );
    }

    // 기본 상태
    return (
        <div>
            <div className="planet-popup-container">
                {/* 닫기 아이콘 */}
                <img
                    src={closeIcon}
                    alt="닫기"
                    className="close-icon"
                    onClick={toggleMinimize}
                    title="클릭하면 팝업창이 최소화됩니다."
                />
                <h4>사용자 설정 위치:</h4>
                <h3>{locationDescription}</h3> {/* 위치 설명 표시 */}
                <h4>해당 위치에서<br />일주일 내에<br />보이는 행성</h4>
                <ul>
                    {visiblePlanets.map((planetName) => (
                        <li
                            key={planetName}
                            onClick={() => handlePlanetClick(planetName)}
                            title={planetDescriptions[planetName]} // 행성 설명 추가
                        >
                            {planetName === 'Mercury' && '수성'}
                            {planetName === 'Venus' && '금성'}
                            {planetName === 'Mars' && '화성'}
                            {planetName === 'Jupiter' && '목성'}
                            {planetName === 'Saturn' && '토성'}
                            {planetName === 'Uranus' && '천왕성'}
                            {planetName === 'Neptune' && '해왕성'}
                        </li>
                    ))}
                </ul>
            </div>

            {selectedPlanet && (
                <PlanetLocationPopup
                    planetName={selectedPlanet}
                    planetData={popupData}
                    onClose={closePopup}
                />
            )}
        </div>
    );
};

export default PlanetLocationButton;
