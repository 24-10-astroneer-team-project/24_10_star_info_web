// PlanetLocationPopup.jsx

import React from 'react';
import './css/PlanetLocationPopup.css';

const PlanetLocationPopup = ({ planetName, planetData, onClose }) => {
    if (!planetData) return null;

    return (
        <div className="popup-overlay_planet">
            <div className="popup-container_planet">
                <button className="popup-close-button" onClick={onClose}>
                    ✕
                </button>
                <h2>{planetName} Data</h2>
                <ul>
                    {planetData.map((data, index) => (
                        <li key={index}>
                            <strong>Date:</strong> {data.date}<br />
                            <strong>Best Time:</strong> {data.best_time}<br />
                            <strong>Altitude:</strong> {data.altitude}<br />
                            <strong>Azimuth:</strong> {data.azimuth}<br />
                            <strong>Distance to Earth:</strong> {data.distance_to_earth}<br />
                            <strong>Visibility:</strong> {data.visibility_judgment}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PlanetLocationPopup;
