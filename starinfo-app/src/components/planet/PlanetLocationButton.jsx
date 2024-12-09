import React, { useState } from 'react';
import PlanetLocationPopup from './PlanetLocationPopup';
import './css/PlanetLocationButton.css';

const PlanetLocationButton = ({ planetData, locationDescription }) => {
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [popupData, setPopupData] = useState(null);

    const handlePlanetClick = (planetName) => {
        if (planetData && planetData[planetName]) {
            setSelectedPlanet(planetName);
            setPopupData(planetData[planetName]);
        } else {
            console.warn(`${planetName} data is not available`);
        }
    };

    const closePopup = () => {
        setSelectedPlanet(null);
        setPopupData(null);
    };

    return (
        <div>
            <div className="planet-popup-container">
                <h3>{locationDescription}</h3> {/* 위치 설명 표시 */}
                <ul>
                    <li onClick={() => handlePlanetClick('Mercury')}>수성</li>
                    <li onClick={() => handlePlanetClick('Venus')}>금성</li>
                    <li onClick={() => handlePlanetClick('Mars')}>화성</li>
                    <li onClick={() => handlePlanetClick('Jupiter')}>목성</li>
                    <li onClick={() => handlePlanetClick('Saturn')}>토성</li>
                    <li onClick={() => handlePlanetClick('Uranus')}>천왕성</li>
                    <li onClick={() => handlePlanetClick('Neptune')}>해왕성</li>
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
