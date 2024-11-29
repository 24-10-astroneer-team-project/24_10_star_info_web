/* Planet.jsx */
/* 어디에도 쓰이고 있지 않음. 존재이유 모르겠음. 건들필요 x */
import React from 'react';

const Planet = ({ id, name, size, planetClass, planetImage, handlePlanetClick }) => {
    return (
        <div id={id} className={`orbit ${planetClass}`} onClick={() => handlePlanetClick(id)}>
            <div className="pos">
                <div
                    className="planet"
                    style={{ width: size, height: size, backgroundImage: `url(${planetImage})` }}
                >
                </div>
            </div>
        </div>
    );
};

export default Planet;
