import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SolarSystem.module.scss'; // SCSS 모듈을 임포트합니다.
import './ThirdSection.css'; // 새로 만든 CSS 파일 임포트
import Main_Button from '../../../../components/layout/Main_Button'; // Main_Button 컴포넌트 임포트

const SolarSystem_main = () => {
    const navigate = useNavigate();

    // 특정 행성을 클릭했을 때 실행
    const handlePlanetClick = (planetName) => {
        navigate(`/react/planet?selectedPlanet=${planetName}`);
    };
    return (
        <div className={`${styles.solarSystemContainer} thirdSectionContainer`}>

            <input className={`${styles.planet9} thirdSectionPlanet`} id="pluto" name="planet" type="radio"/>
            <label className={`${styles.pluto} ${styles.menu} thirdSectionMenu`} htmlFor="pluto">
                <div className={`${styles.preview} thirdSectionPreview`}></div>
                <div className={`${styles.info} thirdSectionInfo`}>
                    <h2>
                        <div className={`${styles.pip} thirdSectionPip`}></div>
                        Pluto
                    </h2>
                    <h3>39.5 AU</h3>
                </div>
            </label>

            <input className={`${styles.planet8} thirdSectionPlanet`} id="neptune" name="planet" type="radio"/>
            <label className={`${styles.neptune} ${styles.menu} thirdSectionMenu`} htmlFor="neptune">
                <div className={`${styles.preview} thirdSectionPreview`}></div>
                <div className={`${styles.info} thirdSectionInfo`}>
                    <h2>
                        <div className={`${styles.pip} thirdSectionPip`}></div>
                        Neptune
                    </h2>
                    <h3>30.06 AU</h3>
                </div>
            </label>

            <input className={`${styles.planet7} thirdSectionPlanet`} id="uranus" name="planet" type="radio"/>
            <label className={`${styles.uranus} ${styles.menu} thirdSectionMenu`} htmlFor="uranus">
                <div className={`${styles.preview} thirdSectionPreview`}></div>
                <div className={`${styles.info} thirdSectionInfo`}>
                    <h2>
                        <div className={`${styles.pip} thirdSectionPip`}></div>
                        Uranus
                    </h2>
                    <h3>19.18 AU</h3>
                </div>
            </label>

            <input className={`${styles.planet6} thirdSectionPlanet`} id="saturn" name="planet" type="radio"/>
            <label className={`${styles.saturn} ${styles.menu} thirdSectionMenu`} htmlFor="saturn">
                <div className={`${styles.preview} thirdSectionPreview`}></div>
                <div className={`${styles.info} thirdSectionInfo`}>
                    <h2>
                        <div className={`${styles.pip} thirdSectionPip`}></div>
                        Saturn
                    </h2>
                    <h3>9.539 AU</h3>
                </div>
            </label>

            <input className={`${styles.planet5} thirdSectionPlanet`} id="jupiter" name="planet" type="radio"/>
            <label className={`${styles.jupiter} ${styles.menu} thirdSectionMenu`} htmlFor="jupiter">
                <div className={`${styles.preview} thirdSectionPreview`}></div>
                <div className={`${styles.info} thirdSectionInfo`}>
                    <h2>
                        <div className={`${styles.pip} thirdSectionPip`}></div>
                        Jupiter
                    </h2>
                    <h3>5.203 AU</h3>
                </div>
            </label>

            <input className={`${styles.planet4} thirdSectionPlanet`} id="mars" name="planet" type="radio"
                   defaultChecked/>
            <label className={`${styles.menu} ${styles.mars} thirdSectionMenu`} htmlFor="mars">
                <div className={`${styles.preview} thirdSectionPreview`}></div>
                <div className={`${styles.info} thirdSectionInfo`}>
                    <h2>
                        <div className={`${styles.pip} thirdSectionPip`}></div>
                        Mars
                    </h2>
                    <h3>1.524 AU</h3>
                </div>
            </label>

            <input className={`${styles.planet3} thirdSectionPlanet`} id="earth" name="planet" type="radio"
                   defaultChecked/>
            <label className={`${styles.menu} ${styles.earth} thirdSectionMenu`} htmlFor="earth">
                <div className={`${styles.preview} thirdSectionPreview`}></div>
                <div className={`${styles.info} thirdSectionInfo`}>
                    <h2>
                        <div className={`${styles.pip} thirdSectionPip`}></div>
                        Earth
                    </h2>
                    <h3>1 AU</h3>
                </div>
            </label>

            <input className={`${styles.planet2} thirdSectionPlanet`} id="venus" name="planet" type="radio"
                   defaultChecked/>
            <label className={`${styles.menu} ${styles.venus} thirdSectionMenu`} htmlFor="venus">
                <div className={`${styles.preview} thirdSectionPreview`}></div>
                <div className={`${styles.info} thirdSectionInfo`}>
                    <h2>
                        <div className={`${styles.pip} thirdSectionPip`}></div>
                        Venus
                    </h2>
                    <h3>0.723 AU</h3>
                </div>
            </label>

            <input className={`${styles.planet1} thirdSectionPlanet`} id="mercury" name="planet" type="radio"
                   defaultChecked/>
            <label className={`${styles.menu} ${styles.mercury} thirdSectionMenu`} htmlFor="mercury">
                <div className={`${styles.preview} thirdSectionPreview`}></div>
                <div className={`${styles.info} thirdSectionInfo`}>
                    <h2>
                        <div className={`${styles.pip} thirdSectionPip`}></div>
                        Mercury
                    </h2>
                    <h3>0.39 AU</h3>
                </div>
            </label>

            <div className={`${styles.solar} thirdSectionSolar`}>
                <div className={`${styles.solar_systm} thirdSectionSystem`}>
                    <div className={`${styles.planet} ${styles.mercury} thirdSectionPlanet`}>
                        <div className={`${styles.planet_description} ${styles.mercury} thirdSectionDescription`}
                             onClick={() => handlePlanetClick('mercury')}
                        >
                            <h2>Planet</h2>
                            <h1>Mercury</h1>
                            <p>
                                태양에 가장 가까운 행성입니다. 다른 모든 행성보다 빠르게 태양을 공전하며, 이러한 이유로 로마인들은 이 행성을 발이 빠른 전령 신의 이름을 따서
                                명명했습니다.
                            </p>
                        </div>
                        <div className={`${styles.overlay} thirdSectionOverlay`}></div>
                    </div>
                </div>

                <div className={`${styles.solar_systm} thirdSectionSystem`}>
                    <div className={`${styles.planet} ${styles.venus} thirdSectionPlanet`}>
                        <div className={`${styles.planet_description} ${styles.venus} thirdSectionDescription`}
                             onClick={() => handlePlanetClick('venus')}
                        >
                            <h2>Planet</h2>
                            <h1>Venus</h1>
                            <p>
                                "사랑과 아름다움의 로마 여신의 이름을 따서 명명되었습니다. 고대에는 금성이 저녁별과 아침별, 두 개의 다른 별로 종종 여겨졌습니다."
                            </p>
                        </div>
                        <div className={`${styles.overlay} thirdSectionOverlay`}></div>
                    </div>
                </div>

                <div className={`${styles.solar_systm} thirdSectionSystem`}>
                    <div className={`${styles.planet} ${styles.earth} thirdSectionPlanet`}>
                        <div className={`${styles.moon} ${styles.moon} thirdSectionMoon`}>
                            <h3>Moon</h3>
                            <h2>Moon</h2>
                        </div>
                        <div className={`${styles.trajectory} ${styles.m} thirdSectionTrajectory`}></div>
                        <div className={`${styles.planet_description} ${styles.earth} thirdSectionDescription`}
                             onClick={() => handlePlanetClick('earth')}
                        >
                            <h2>Planet</h2>
                            <h1>Earth</h1>
                            <p>
                                "지구, 우리의 고향. 자유 산소를 포함한 대기, 표면에 액체 상태의 물이 있는 바다, 그리고 물론 생명이 존재하는 유일한 행성으로 알려져 있습니다."
                            </p>
                        </div>
                        <div className={`${styles.overlay} thirdSectionOverlay`}></div>
                    </div>
                </div>

                <div className={`${styles.solar_systm} thirdSectionSystem`}>
                    <div className={`${styles.planet} ${styles.mars} thirdSectionPlanet`}>
                        <div className={`${styles.moon} ${styles.deimos} thirdSectionMoon`}>
                            <h3>Moon</h3>
                            <h2>Deimos</h2>
                        </div>
                        <div className={`${styles.trajectory} ${styles.d} thirdSectionTrajectory`}></div>
                        <div className={`${styles.moon} ${styles.phoebos} thirdSectionMoon`}>
                            <h3>Moon</h3>
                            <h2>Phoebos</h2>
                        </div>
                        <div className={`${styles.trajectory} ${styles.p} thirdSectionTrajectory`}></div>
                        <div className={`${styles.planet_description} ${styles.mars} thirdSectionDescription`}
                             onClick={() => handlePlanetClick('mars')}
                        >
                            <h2>Planet</h2>
                            <h1>Mars</h1>
                            <p>
                                "태양에서 네 번째 행성이자 태양계에서 두 번째로 작은 행성입니다. 로마의 전쟁의 신 이름을 따서 명명되었으며, 종종 ‘붉은 행성’으로 묘사됩니다."
                            </p>
                        </div>
                        <div className={`${styles.overlay} thirdSectionOverlay`}></div>
                    </div>
                </div>

                <div className={`${styles.solar_systm} thirdSectionSystem`}>
                    <div className={`${styles.planet} ${styles.jupiter} thirdSectionPlanet`}>
                        <div className={`${styles.moon} ${styles.lo} thirdSectionMoon`}>
                            <h3>Moon</h3>
                            <h2>Io</h2>
                        </div>
                        <div className={`${styles.moon} ${styles.europa} thirdSectionMoon`}>
                            <h3>Moon</h3>
                            <h2>Europa</h2>
                        </div>
                        <div className={`${styles.moon} ${styles.ganymede} thirdSectionMoon`}>
                            <h3>Moon</h3>
                            <h2>Ganymede</h2>
                        </div>
                        <div className={`${styles.trajectory} ${styles.lop} thirdSectionTrajectory`}></div>
                        <div className={`${styles.trajectory} ${styles.eu} thirdSectionTrajectory`}></div>
                        <div className={`${styles.trajectory} ${styles.ga} thirdSectionTrajectory`}></div>
                        <div className={`${styles.planet_description} ${styles.jupiter} thirdSectionDescription`}
                             onClick={() => handlePlanetClick('jupiter')}
                        >
                            <h2>Planet</h2>
                            <h1>Jupiter</h1>
                            <p>
                                "목성은 태양계에서 가장 큰 행성으로, 로마 신화의 신들의 왕의 이름을 따서 명명되었습니다."
                            </p>
                        </div>
                        <div className={`${styles.overlay} thirdSectionOverlay`}></div>
                    </div>
                </div>

                <div className={`${styles.solar_systm} thirdSectionSystem`}>
                    <div className={`${styles.planet} ${styles.saturn} thirdSectionPlanet`}>
                        <div className={`${styles.moon} ${styles.titan} thirdSectionMoon`}>
                            <h3>Moon</h3>
                            <h2>Titan</h2>
                        </div>
                        <div className={`${styles.moon} ${styles.dione} thirdSectionMoon`}>
                            <h3>Moon</h3>
                            <h2>Dione</h2>
                        </div>
                        <div className={`${styles.moon} ${styles.enceladus} thirdSectionMoon`}>
                            <h3>Moon</h3>
                            <h2>Enceladus</h2>
                        </div>
                        <div className={`${styles.trajectory} ${styles.ti} thirdSectionTrajectory`}></div>
                        <div className={`${styles.trajectory} ${styles.di} thirdSectionTrajectory`}></div>
                        <div className={`${styles.trajectory} ${styles.enc} thirdSectionTrajectory`}></div>
                        <div className={`${styles.planet_description} ${styles.saturn} thirdSectionDescription`}
                             onClick={() => handlePlanetClick('saturn')}
                        >
                            <h2>Planet</h2>
                            <h1>Saturn</h1>
                            <p>
                                "토성은 태양에서 여섯 번째 행성이자 두 번째로 큰 행성으로, 로마 신화의 부와 농업의 신의 이름을 따서 명명되었습니다."
                            </p>
                        </div>
                        <div className={`${styles.overlay} thirdSectionOverlay`}></div>
                    </div>
                </div>

                <div className={`${styles.solar_systm} thirdSectionSystem`}>
                    <div className={`${styles.planet} ${styles.uranus} thirdSectionPlanet`}>
                        <div className={`${styles.moon} ${styles.miranda} thirdSectionMoon`}>
                            <h3>Moon</h3>
                            <h2>Miranda</h2>
                        </div>
                        <div className={`${styles.moon} ${styles.ariel} thirdSectionMoon`}>
                            <h3>Moon</h3>
                            <h2>Ariel</h2>
                        </div>
                        <div className={`${styles.moon} ${styles.umbriel} thirdSectionMoon`}>
                            <h3>Moon</h3>
                            <h2>Umbriel</h2>
                        </div>
                        <div className={`${styles.trajectory} ${styles.mir} thirdSectionTrajectory`}></div>
                        <div className={`${styles.trajectory} ${styles.ari} thirdSectionTrajectory`}></div>
                        <div className={`${styles.trajectory} ${styles.umb} thirdSectionTrajectory`}></div>
                        <div className={`${styles.planet_description} ${styles.uranus} thirdSectionDescription`}
                             onClick={() => handlePlanetClick('uranus')}
                        >
                            <h2>Planet</h2>
                            <h1>Uranus</h1>
                            <p>
                                "천왕성은 태양에서 일곱 번째 행성으로, 독특한 기울기로 인해 태양 주위를 구르듯이 도는 것으로 유명합니다."
                            </p>
                        </div>
                        <div className={`${styles.overlay} thirdSectionOverlay`}></div>
                    </div>
                </div>

                <div className={`${styles.solar_systm} thirdSectionSystem`}>
                    <div className={`${styles.planet} ${styles.neptune} thirdSectionPlanet`}>
                        <div className={`${styles.moon} ${styles.triton} thirdSectionMoon`}>
                            <h3>Moon</h3>
                            <h2>Triton</h2>
                        </div>
                        <div className={`${styles.moon} ${styles.proteus} thirdSectionMoon`}>
                            <h3>Moon</h3>
                            <h2>Proteus</h2>
                        </div>
                        <div className={`${styles.moon} ${styles.nereid} thirdSectionMoon`}>
                            <h3>Moon</h3>
                            <h2>Nereid</h2>
                        </div>
                        <div className={`${styles.trajectory} ${styles.tri} thirdSectionTrajectory`}></div>
                        <div className={`${styles.trajectory} ${styles.pro} thirdSectionTrajectory`}></div>
                        <div className={`${styles.trajectory} ${styles.ner} thirdSectionTrajectory`}></div>
                        <div className={`${styles.planet_description} ${styles.neptune} thirdSectionDescription`}
                             onClick={() => handlePlanetClick('neptune')}
                        >
                            <h2>Planet</h2>
                            <h1>Neptune</h1>
                            <p>
                                "해왕성은 태양에서 가장 멀리 떨어진 여덟 번째 행성으로, 깊은 푸른색 때문에 로마의 바다의 신 이름을 따서 명명되었습니다."
                            </p>
                        </div>
                        <div className={`${styles.overlay} thirdSectionOverlay`}></div>
                    </div>
                </div>

                <div className={`${styles.solar_systm} thirdSectionSystem`}>
                    <div className={`${styles.planet} ${styles.pluto} thirdSectionPlanet`}>
                        <div className={`${styles.planet_description} ${styles.pluto} thirdSectionDescription`}
                             onClick={() => handlePlanetClick('pluto')}
                        >
                            <h2>Dwarf planet</h2>
                            <h1>Pluto</h1>
                            <p>
                                "한때 아홉 번째 행성이었
                                던 명왕성은 이제 우리 태양계에서 가장 큰 왜소 행성으로 <br/>분류됩니다."
                            </p>
                        </div>
                        <div className={`${styles.overlay} thirdSectionOverlay`}></div>
                    </div>
                </div>
                {/* 버튼 */}
                <Main_Button onClick={() => navigate('/react/planet')} label="행성 페이지 이동"/>
            </div>
        </div>
    );
};

export default SolarSystem_main;