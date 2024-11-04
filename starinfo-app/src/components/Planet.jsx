import React from 'react';
import anime from 'animejs';

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
