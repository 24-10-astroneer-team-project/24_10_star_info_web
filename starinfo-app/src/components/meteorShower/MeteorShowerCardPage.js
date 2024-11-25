// MeteorShowerCardPage.js

import React from 'react';
import './MeteorShowerCardPage.css';

const MeteorShowerCardPage = ({ generalMeteorData, onShowDetails }) => {
    // 데이터를 평탄화하여 중첩 배열을 단일 배열로 변환
    const flattenedMeteorData = generalMeteorData.flatMap((data) => {
        if (Array.isArray(data.data)) {
            // 정상적인 배열인 경우
            return data.data.map((meteorData) => ({
                cometName: data.cometName,
                ...meteorData,
            }));
        } else if (data.data.error) {
            // 오류 메시지를 포함한 경우
            return [
                {
                    cometName: data.cometName,
                    error: data.data.error,
                },
            ];
        } else {
            // 데이터가 비정상적인 경우 빈 배열 반환
            return [];
        }
    });

    return (
        <div className="meteor-shower-cards">
            {flattenedMeteorData.map((meteorData, index) => (
                <div className="meteor-shower-card" key={index}>
                    <h3>{meteorData.cometName}</h3>
                    {meteorData.error ? (
                        <p className="error-message">{meteorData.error}</p>
                    ) : (
                        <div className="meteor-shower-details">
                            <h4>Meteor Shower: {meteorData.name}</h4>
                            <p>Peak period: {meteorData.peak_start_date} to {meteorData.peak_end_date}</p>
                            <p>{meteorData.message}</p>
                            <p>Declination: {meteorData.declination}</p>
                            <p>RA: {meteorData.ra}</p>
                            <p>Distance: {meteorData.distance}</p>
                            <p>Status: {meteorData.status}</p>
                            <p>Conditions Used: {meteorData.conditions_used}</p>
                            <button onClick={() => onShowDetails(meteorData.name)}>상세보기</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MeteorShowerCardPage;