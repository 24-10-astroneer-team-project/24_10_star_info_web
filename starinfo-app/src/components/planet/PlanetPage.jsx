import React, {useEffect, useState} from 'react';
import anime from 'animejs/lib/anime.es.js';
import SolarSystem from './SolarSystem';
import {useAuth} from '../../services/AuthProvider'; // 인증 훅
import useUserLocation from '../../hooks/useUserLocation'; // 위치 정보 훅
import {sendLocationToServer} from '../../services/LocationService'; // 위치 저장 서비스
import LoadingSpinner from '../ui/LoadingSpinner';
import './Planet.css';
import axios from "axios";

const planets = [
    {
        id: '1',
        name: 'Mercury',
        diameter: '3,031.67 mi',
        moons: 'none',
        desc: 'Mercury is the closest planet to the Sun. Due to its proximity, it\'s not easily seen except during twilight. For every two orbits of the Sun, Mercury completes three rotations about its axis. Up until 1965 it was thought that the same side of Mercury constantly faced the Sun.',
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/332937/mercury2.jpg',
        color: '#999999',
        tilt: '0.034deg'
    },
    {
        id: '2',
        name: 'Venus',
        diameter: '7,521 mi',
        moons: 'none',
        desc: 'Venus is the second planet from the Sun and is the second brightest object in the night sky after the Moon. Venus is the second largest terrestrial planet and is sometimes referred to as the Earth’s sister planet due the their similar size and mass.',
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/332937/venus2.jpg',
        color: '#e8cda2',
        tilt: '177.3deg'
    },
    {
        id: '3',
        name: 'Earth',
        diameter: '7,917.5 mi',
        moons: '1',
        desc: 'Earth is the third planet from the Sun and is the largest of the terrestrial planets. The Earth is the only planet in our solar system not to be named after a Greek or Roman deity. The Earth was formed approximately 4.54 billion years ago and is the only known planet to support life.',
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/332937/earth.jpg',
        color: '#b3caff',
        tilt: '23.26deg'
    },
    {
        id: '4',
        name: 'Mars',
        diameter: '4,212 mi',
        moons: '2',
        desc: 'The fourth planet from the Sun and the second smallest planet in the solar system. Mars is often described as the "Red Planet" due to its reddish appearance. It\'s a terrestrial planet with a thin atmosphere composed primarily of carbon dioxide.',
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/332937/mars.jpg',
        color: '#c07158',
        tilt: '25.2deg'
    },
    {
        id: '5',
        name: 'Jupiter',
        diameter: '86,881.4 mi',
        moons: '79',
        desc: 'The planet Jupiter is the fifth planet out from the Sun, and is two and a half times more massive than all the other planets in the solar system combined. It is made primarily of gases and is therefore known as a "gas giant".',
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/332937/jupiter.jpg',
        color: '#c9b5a4',
        tilt: '3.1deg'
    },
    {
        id: '6',
        name: 'Saturn',
        diameter: '72,367.4 mi',
        moons: '62',
        desc: 'Saturn is the sixth planet from the Sun and the most distant that can be seen with the naked eye. Saturn is the second largest planet and is best known for its fabulous ring system that was first observed in 1610 by the astronomer Galileo Galilei.',
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/332937/saturn.jpg',
        color: '#f0e2c4',
        tilt: '26.7deg'
    },
    {
        id: '7',
        name: 'Uranus',
        diameter: '31,518 mi',
        moons: '27',
        desc: 'Uranus is the seventh planet from the Sun. While being visible to the naked eye, it was not recognised as a planet due to its dimness and slow orbit. Uranus became the first planet discovered with the use of a telescope.',
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/332937/uranus2.jpg',
        color: '#b8d8e1',
        tilt: '97.8deg'
    },
    {
        id: '8',
        name: 'Neptune',
        diameter: '30,599 mi',
        moons: '14',
        desc: 'Neptune is the eighth planet from the Sun making it the most distant in the solar system. This gas giant planet may have formed much closer to the Sun in early solar system history before migrating to its present position.',
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/332937/neptune.jpg',
        color: '#5e73bb',
        tilt: '28.3deg'
    }
];

// PlanetCard 컴포넌트 정의 (카드 형태의 정보 표시)
const PlanetCard = ({name, diameter, moons, desc, url, color, tilt}) => (
    <div className="card">
        <div className="card__planet">
            {/* 행성 축 */}
            <div
                className="planet-axis"
                style={{
                    transform: `rotate(${tilt})`, // 축 기울기
                    borderLeft: `1px dashed ${color}`,
                    height: '100%', // 부모와 동일한 높이
                }}
            />
            {/* 행성 대기 */}
            <div
                className="planet__atmosphere"
                style={{
                    boxShadow: `inset 10px 0px 12px -2px rgba(255, 255, 255, 0.2), inset -30px 0px 50px 0px black, -5px 0px 10px -4px ${color}`,
                }}
            >
                {/* 행성 표면 */}
                <div
                    className="planet__surface"
                    style={{
                        backgroundImage: `url(${url})`,
                        transform: 'scale(1.2)', // 크기 조정
                        backgroundSize: 'cover',
                        backgroundPosition: 'left center', // 가로 이미지의 왼쪽 활용
                    }}
                />
            </div>
        </div>
        <h2>{name}</h2>
        <p>{desc}</p>
        <h3>Planet Profile</h3>
        <ul>
            <li><strong>Diameter:</strong> {diameter}</li>
            <li><strong>Moons:</strong> {moons}</li>
        </ul>
    </div>
);

const PlanetPage = () => {
    const { location, isLoading } = useUserLocation(); // 위치 정보
    const {isAuthenticated, user, isAuthLoading} = useAuth(); // 인증 정보

    const [bodyClass, setBodyClass] = useState("opening hide-UI view-2D zoom-large data-close controls-close");
    const [solarSystemClass, setSolarSystemClass] = useState("earth");
    const [isDataOpen, setIsDataOpen] = useState(false);
    const [previousPlanet, setPreviousPlanet] = useState(null);
    const [isPlanetPopupOpen, setPlanetPopupOpen] = useState(false);
    const [scaleFactor, setScaleFactor] = useState(1);

    const [locationSaved, setLocationSaved] = useState(false);
    const [saveError, setSaveError] = useState(null);

    const [planetData, setPlanetData] = useState({}); // 모든 행성 데이터를 저장
    const [dataLoading, setDataLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    const today = new Date().toISOString().split("T")[0];
    const rangeDays = "7";

    const planetsApi = ["Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];

    // 모든 행성 데이터를 가져오기
    useEffect(() => {
        console.log('PlanetPage - useEffect 실행됨. isLoading 상태:', isLoading);
        if (isLoading || !location) {
            console.log('위치 정보가 아직 설정되지 않았거나 로딩 중입니다.');
            return;
        }

        const fetchAllPlanets = async () => {
            setDataLoading(true);
            console.log("Fetching all planet data...");
            try {
                const responses = await Promise.all(
                    planetsApi.map((planet) =>
                        axios
                            .get(`/planet/visibility`, {
                                params: {
                                    planetName: planet,
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                    date: today,
                                    rangeDays,
                                },
                            })
                            .then((response) => {
                                console.log(`Planet ${planet} response:`, response.data);
                                return {planet, data: response.data};
                            })
                            .catch((error) => {
                                console.error(`Error fetching data for ${planet}:`, error);
                                return {planet, error};
                            })
                    )
                );

                const allData = {};
                responses.forEach(({planet, data, error}) => {
                    if (data) {
                        allData[planet] = data;
                    }
                    if (error) {
                        console.error(`Error with ${planet}:`, error);
                    }
                });

                setPlanetData(allData);
            } catch (error) {
                console.error("Error fetching all planet data:", error);
                setFetchError(error);
            } finally {
                setDataLoading(false);
                console.log("Finished fetching planet data.");
            }
        };

        fetchAllPlanets();
    }, [location, isLoading]);

    // 위치 데이터 서버로 전송
    useEffect(() => {
        const saveLocation = async () => {
            if (!isAuthenticated || !location || locationSaved) return;

            console.log("Saving location to server...");
            try {
                const response = await sendLocationToServer({
                    userId: user.id,
                    latitude: location.latitude,
                    longitude: location.longitude,
                });
                console.log("Location saved successfully:", response);
                setLocationSaved(true);
            } catch (error) {
                console.error("Error saving location:", error);
                setSaveError(error);
            }
        };

        saveLocation();
    }, [isAuthenticated, location, locationSaved, user]);

    // 행성 클릭 이벤트 핸들러
    const handlePlanetClick = (planetClass) => {
        if (previousPlanet && previousPlanet === planetClass) {
            return;
        }

        if (previousPlanet) {
            anime({
                targets: `#solar-system .planet[data-planet="${previousPlanet}"]`,
                scale: [1.3, 1],
                duration: 1000,
                easing: "easeInOutQuad",
            });
        }

        anime({
            targets: `#solar-system .planet[data-planet="${planetClass}"]`,
            scale: [1, 1.3],
            duration: 1000,
            easing: "easeInOutQuad",
            complete: () => {
                setTimeout(() => {
                    openPlanetPopup(planetClass);
                }, 500);
            },
        });

        setPreviousPlanet(planetClass);
        setSolarSystemClass(planetClass);
    };

    const openPlanetPopup = (planetClass) => {
        setPlanetPopupOpen(true);
        setTimeout(() => {
            anime({
                targets: ".planet-popup",
                scale: [0.5, 1],
                opacity: [0, 1],
                duration: 600,
                easing: "easeOutBack",
            });
        }, 0);
    };

    const closePlanetPopup = () => {
        if (previousPlanet) {
            anime({
                targets: `#solar-system .planet[data-planet="${previousPlanet}"]`,
                scale: [1.3, 1],
                duration: 1000,
                easing: "easeInOutQuad",
                complete: () => {
                    setPreviousPlanet(null);
                },
            });
        }

        setPlanetPopupOpen(false);
    };

    // 로딩 및 에러 처리
    if (isAuthLoading || isLoading || dataLoading) {
        console.log("Loading state active. Waiting for data...");
        console.log(`isAuthLoading: ${isAuthLoading}`);
        console.log(`dataLoading: ${dataLoading}`);
        console.log(`isLoading: ${isLoading}`);
        return <LoadingSpinner />;
    }

    if (saveError) {
        console.error("Save error:", saveError.message);
        return <div>Error saving location: {saveError.message}</div>;
    }

    if (fetchError) {
        console.error("Fetch error:", fetchError.message);
        return <div>Error fetching planet data: {fetchError.message}</div>;
    }

    const selectedPlanet = solarSystemClass && planetData ? planetData[solarSystemClass] : null;

    return (
        <>
            <div id="planet-page" className={`planet-container ${bodyClass}`}>
                <div id="navbar">
                    <a id="toggle-data" href="#data" onClick={(e) => {
                        e.preventDefault();
                        setIsDataOpen(!isDataOpen);
                    }}>Data</a>
                </div>

                {isDataOpen && (
                    <div id="data">
                        <a className={`sun ${solarSystemClass === 'sun' ? 'active' : ''}`}
                           onClick={() => handlePlanetClick('sun')} href="#sunspeed">Sun</a>
                        <a className={`mercury ${solarSystemClass === 'mercury' ? 'active' : ''}`}
                           onClick={() => handlePlanetClick('mercury')} href="#mercuryspeed">Mercury</a>
                        <a className={`venus ${solarSystemClass === 'venus' ? 'active' : ''}`}
                           onClick={() => handlePlanetClick('venus')} href="#venusspeed">Venus</a>
                        <a className={`earth ${solarSystemClass === 'earth' ? 'active' : ''}`}
                           onClick={() => handlePlanetClick('earth')} href="#earthspeed">Earth</a>
                        <a className={`mars ${solarSystemClass === 'mars' ? 'active' : ''}`}
                           onClick={() => handlePlanetClick('mars')} href="#marsspeed">Mars</a>
                        <a className={`jupiter ${solarSystemClass === 'jupiter' ? 'active' : ''}`}
                           onClick={() => handlePlanetClick('jupiter')} href="#jupiterspeed">Jupiter</a>
                        <a className={`saturn ${solarSystemClass === 'saturn' ? 'active' : ''}`}
                           onClick={() => handlePlanetClick('saturn')} href="#saturnspeed">Saturn</a>
                        <a className={`uranus ${solarSystemClass === 'uranus' ? 'active' : ''}`}
                           onClick={() => handlePlanetClick('uranus')} href="#uranusspeed">Uranus</a>
                        <a className={`neptune ${solarSystemClass === 'neptune' ? 'active' : ''}`}
                           onClick={() => handlePlanetClick('neptune')} href="#neptunespeed">Neptune</a>
                    </div>
                )}


                <div id="universe" className="scale-stretched">
                    <div id="galaxy" style={{transform: `scale(${scaleFactor})`}}>
                        <SolarSystem solarSystemClass={solarSystemClass} handlePlanetClick={handlePlanetClick}/>
                    </div>
                </div>

                {/* PlanetCard를 팝업 형태로 렌더링 */}
                {isPlanetPopupOpen && selectedPlanet && (
                    <div id="planetPopup" className="planet-popup-bc" onClick={closePlanetPopup}>
                        <div className="planet-popup" onClick={(e) => e.stopPropagation()}>
                            <PlanetCard
                                name={selectedPlanet.name}
                                diameter={selectedPlanet.diameter}
                                moons={selectedPlanet.moons}
                                desc={selectedPlanet.desc}
                                url={selectedPlanet.url}
                                tilt={selectedPlanet.tilt}
                                color={selectedPlanet.color}

                            />
                            {/*<button className="popup-close-button" onClick={closePlanetPopup}>닫기</button>*/}
                        </div>
                    </div>
                )}

            </div>
            )
        </>
    );
};

export default PlanetPage;

