import React, { useState, useEffect } from 'react';
import './ApiLLPopup.css';

const ApiLLPopup = ({ isVisible, coordinates, topPosition, constellationName, closePopup }) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closePopup(); // Close the popup on Esc key press
            }
        };

        if (isVisible) {
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }

        // Clean up the event listener on unmount or when isVisible changes
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isVisible, closePopup]);

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
