import React from 'react';
import './ApiLLPopup.css';

const ApiLLPopup = ({ isVisible, coordinates, topPosition, constellationName }) => {
    if (!isVisible) return null;

    return (
        <div className="api-ll-popup-container" style={{ top: topPosition }}>
            <h3>{constellationName}</h3> {/* 한국 이름 표시 */}
            <div className="l_w">위도: {coordinates.latitude}</div>
            <div className="l_g">경도: {coordinates.longitude}</div>
            <hr />
        </div>
    );
};

export default ApiLLPopup;
