import React from 'react';
import './MeteorShowerCardPage.css';

const MeteorShowerCardPage = ({ generalMeteorData, onShowDetails }) => {
    const flattenedMeteorData = generalMeteorData.flatMap((data) => {
        if (Array.isArray(data.data)) {
            return data.data.map((meteorData) => ({
                cometName: data.cometName,
                ...meteorData,
            }));
        } else if (data.data.error) {
            return [
                {
                    cometName: data.cometName,
                    error: data.data.error,
                },
            ];
        } else {
            return [];
        }
    });

    const translateMessage = (message) => {
        if (message === "Meteor shower peak period is near the comet approach date, increasing observation potential.") {
            return "유성우 최대 활동 기간이 혜성이 접근하는 날짜와 가깝습니다. 관측 가능성이 높습니다.";
        } else if (message === "Meteor shower is not at its peak period.") {
            return "유성우가 최대 활동 기간에 있지 않습니다.";
        } else {
            return message; // 기본값 (번역되지 않은 메시지)
        }
    };

    const translateConditions = (conditions) => {
        if (conditions === "Lenient conditions applied") {
            return "구름이 약간 있거나, 완전히 어두운 밤이 아니더라도 관측이 가능할 수 있습니다.";
        } else if (conditions === "Standard conditions applied") {
            return "맑고 완전히 어두운 하늘에서만 관측이 가능할 것입니다.";
        } else {
            return conditions; // 기본값 (번역되지 않은 조건)
        }
    };

    const translateCometName = (cometName) => {
        if (cometName === "Swift-Tuttle") {
            return "스위프트-터틀";
        } else if (cometName === "Halley") {
            return "핼리";
        } else if (cometName === "Tuttle") {
            return "터틀";
        } else {
            return cometName; // 기본값 (번역되지 않은 이름)
        }
    };

    const translateMeteorShowerName = (meteorShowerName) => {
        if (meteorShowerName === "Perseid") {
            return "페르세이드";
        } else if (meteorShowerName === "Eta Aquariid") {
            return "에타아쿠아리드";
        } else if (meteorShowerName === "Orionid") {
            return "오리오니드";
        } else if (meteorShowerName === "Ursid") {
            return "우르시드";
        } else {
            return meteorShowerName; // 기본값 (번역되지 않은 이름)
        }
    };

    return (
        <div className="meteor-shower-cards">
            {flattenedMeteorData.map((meteorData, index) => (
                <div className="meteor-shower-card" key={index}>
                    <h3 className="comet-name">{translateMeteorShowerName(meteorData.name)}</h3>
                    <div className="meteor-shower-details">
                        {meteorData.error ? (
                            <p>{meteorData.error}</p>
                        ) : (
                            <>
                                <p>혜성 이름: {translateCometName(meteorData.cometName)}</p>
                                <p>최대 활동 기간: {meteorData.peak_start_date} ~ {meteorData.peak_end_date}</p>
                                <p>메시지: {translateMessage(meteorData.message)}</p>
                                <p>적위: {meteorData.declination}</p>
                                <p>적경: {meteorData.ra}</p>
                                <p>거리: {meteorData.distance} AU</p>
                                <p>상태: {meteorData.status === "closing" ? "접근 중" : "멀어짐"}</p>
                                <p>관측 조건: {translateConditions(meteorData.conditions_used)}</p>
                                <button onClick={() => onShowDetails(meteorData.name)}>상세보기</button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MeteorShowerCardPage;
