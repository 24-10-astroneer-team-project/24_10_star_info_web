import React from "react";
import "./MeteorShowerPopup.css";

// 유성우 이름 번역 함수
const translateMeteorShowerName = (meteorShowerName) => {
    const translations = {
        Perseid: "페르세이드",
        "Eta Aquariid": "에타아쿠아리드",
        Orionid: "오리오니드",
        Ursid: "우르시드",
    };
    return translations[meteorShowerName] || meteorShowerName;
};

// 메시지 번역 함수
const translateMessage = (message) => {
    const translations = {
        "Meteor shower peak period is near the comet approach date, increasing observation potential.":
            "유성우 최대 활동 기간이 혜성이 접근하는 날짜와 가깝습니다. 관측 가능성이 높아집니다.",
        "Meteor shower is not at its peak period.":
            "유성우가 최대 활동 기간에 있지 않습니다.",
    };
    return translations[message] || message;
};

// 관측 가시성 등급에 따라 이모티콘 추가
const parseVisibilityRating = (rating) => {
    const ratingsWithEmojis = {
        Excellent: "Excellent 🌟🌟",
        Good: "Good 👍✨",
        Moderate: "Moderate 😐💫",
        Poor: "Poor 😞☁️",
        "Very Poor": "Very Poor 😢🌫️",
    };
    return ratingsWithEmojis[rating] || rating; // 등급이 매핑되지 않으면 원래 값 반환
};

const MeteorShowerPopup = ({ meteorData, onClose, isLoading }) => {
    if (isLoading) {
        return (
            <div className="meteor-details-popup">
                <div className="loading-spinner"></div>
                <p className="loading-text">데이터를 가져오는 중입니다...</p>
            </div>
        );
    }

    if (!meteorData) return null;

    // 달 위상 이미지 매핑
    const moonPhaseImages = {
        "New Moon": "newmoon.png",
        "Waxing Crescent": "waxingcrescent.png",
        "First Quarter": "firstquarter.png",
        "Waxing Gibbous": "waxinggibbous.png",
        "Full Moon": "fullmoon.png",
        "Waning Gibbous": "waninggibbous.png",
        "Last Quarter": "lastquarter.png",
        "Waning Crescent": "waningcrescent.png",
    };

    const moonPhaseImageSrc = `https://raw.githubusercontent.com/tallulahh/moon-phase/main/${
        moonPhaseImages[meteorData.phaseDescription] || "default.png"
    }`;

    return (
        <div className="meteor-details-popup">
            {/* 달 위상 섹션 */}
            <div className="moon-phase-section">
                <img src={moonPhaseImageSrc} alt="Moon Phase" className="moon-phase-image" />
                <p className="moon-phase-name">{meteorData.phaseDescription}</p>
            </div>

            {/* 유성우 세부 정보 섹션 */}
            <div className="meteor-details-content">
                <h2>{translateMeteorShowerName(meteorData.meteorShowerName)} 상세 정보</h2>
                {meteorData.peakStart && meteorData.peakEnd && (
                    <p>최대 활동 기간: {meteorData.peakStart} ~ {meteorData.peakEnd}</p>
                )}
                {meteorData.bestPeakDatetime && (
                    <p>관측 최적 시간: {meteorData.bestPeakDatetime}</p>
                )}
                {meteorData.phaseDescription && (
                    <p>달 위상: {meteorData.phaseDescription}</p>
                )}
                {meteorData.visibilityRating && (
                    <p>관측 가시성 등급: {parseVisibilityRating(meteorData.visibilityRating)}</p>
                )}
                {meteorData.visibilityMessage && (
                    <p>메시지: {translateMessage(meteorData.visibilityMessage)}</p>
                )}
                {meteorData.direction && <p>관측 방향: {meteorData.direction}</p>}
                {meteorData.altitude !== undefined && (
                    <p>고도: {meteorData.altitude.toFixed(2)}°</p>
                )}
                {meteorData.illumination !== undefined && (
                    <p>조도: {(meteorData.illumination * 100).toFixed(1)}%</p>
                )}
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default MeteorShowerPopup;
