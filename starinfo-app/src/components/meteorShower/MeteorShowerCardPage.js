// MeteorShowerCardPage.js

import React from 'react';
import './MeteorShowerCardPage.css';

const MeteorShowerCardPage = ({ generalMeteorData, onShowDetails }) => {
    // console.log('MeteorShowerCardPage Rendering', generalMeteorData);

    // 데이터를 평탄화하여 중첩 배열을 단일 배열로 변환
    const flattenedMeteorData = generalMeteorData.flatMap((data) =>
        data.data.map((meteorData) => ({
            cometName: data.cometName,
            ...meteorData,
        }))
    );

    return (
        <div className="meteor-shower-cards">
            {flattenedMeteorData.map((meteorData, index) => (
                <div className="meteor-shower-card" key={index}>
                    <h3>{meteorData.cometName}</h3>
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
                </div>
            ))}
        </div>
    );
};

export default MeteorShowerCardPage;
