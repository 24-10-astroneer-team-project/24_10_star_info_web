/* SolarSystem.jsx */
/* 메인화면 중단 "공전하는" 행성들 담당 코드. 건들필요 x*/
import React from "react";
import './PlanetPage.css';

const SolarSystem = ({solarSystemClass, handlePlanetClick}) => {
    return (
        <div>
            <div id="solar-system" className={solarSystemClass}>
                <div id="mercury" className="orbit">
                    <div className="pos">
                        <div className="planet" data-planet="mercury" onClick={() => handlePlanetClick('mercury')}>
                            <dl className="infos">
                                <dt>Mercury</dt>
                                <dd><span></span></dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div id="venus" className="orbit">
                    <div className="pos">
                        <div className="planet" data-planet="venus" onClick={() => handlePlanetClick('venus')}>
                            <dl className="infos">
                                <dt>Venus</dt>
                                <dd><span></span></dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div id="earth" className="orbit">
                    <div className="pos">
                        <div className="orbit">
                            <div className="pos">
                                <div className="moon"></div>
                            </div>
                        </div>
                        <div className="planet" data-planet="earth" onClick={() => handlePlanetClick('earth')}>
                            <dl className="infos">
                                <dt>Earth</dt>
                                <dd><span></span></dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div id="mars" className="orbit">
                    <div className="pos">
                        <div className="planet" data-planet="mars" onClick={() => handlePlanetClick('mars')}>
                            <dl className="infos">
                                <dt>Mars</dt>
                                <dd><span></span></dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div id="jupiter" className="orbit">
                    <div className="pos">
                        <div className="planet" data-planet="jupiter" onClick={() => handlePlanetClick('jupiter')}>
                            <dl className="infos">
                                <dt>Jupiter</dt>
                                <dd><span></span></dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div id="saturn" className="orbit">
                    <div className="pos">
                        <div className="planet" data-planet="saturn" onClick={() => handlePlanetClick('saturn')}>
                            <div className="ring"></div>
                            <dl className="infos">
                                <dt>Saturn</dt>
                                <dd><span></span></dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div id="uranus" className="orbit">
                    <div className="pos">
                        <div className="planet" data-planet="uranus" onClick={() => handlePlanetClick('uranus')}>
                            <dl className="infos">
                                <dt>Uranus</dt>
                                <dd><span></span></dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div id="neptune" className="orbit">
                    <div className="pos">
                        <div className="planet" data-planet="neptune" onClick={() => handlePlanetClick('neptune')}>
                            <dl className="infos">
                                <dt>Neptune</dt>
                                <dd><span></span></dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div id="sun">
                    <dl className="infos">
                        <dt>Sun</dt>
                        <dd><span></span></dd>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default SolarSystem;