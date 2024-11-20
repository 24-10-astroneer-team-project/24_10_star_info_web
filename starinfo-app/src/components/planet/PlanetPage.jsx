import React, {useEffect, useState} from 'react';
import anime from 'animejs/lib/anime.es.js';
import SolarSystem from './SolarSystem';
import {useAuth} from '../../services/AuthProvider'; // 인증 훅
import useUserLocation from '../../hooks/useUserLocation'; // 위치 정보 훅
import {sendLocationToServer} from '../../services/LocationService'; // 위치 저장 서비스
import LoadingSpinner from '../ui/LoadingSpinner';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
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

    const navigate = useNavigate();

    const [locationSaved, setLocationSaved] = useState(false);
    const [saveError, setSaveError] = useState(null);

    const [planetData, setPlanetData] = useState({}); // 모든 행성 데이터를 저장
    const [dataLoading, setDataLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    const today = new Date().toISOString().split("T")[0];
    const rangeDays = "7";

    const planetsApi = ["Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];

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
                                return { planet, data: response.data };
                            })
                            .catch((error) => {
                                console.error(`Error fetching data for ${planet}:`, error);
                                throw error; // 에러를 상위 try-catch로 전달
                            })
                    )
                );

                const allData = {};
                responses.forEach(({ planet, data }) => {
                    if (data) {
                        allData[planet] = data;
                    }
                });

                setPlanetData(allData);
            } catch (error) {
                console.error("Error fetching all planet data:", error);

                // Toast 메시지와 리다이렉트 처리
                toast.error("행성 데이터를 가져오는 중 오류가 발생했습니다. 404 페이지로 이동합니다...", {
                    position: "top-center",
                    autoClose: 3000,
                });

                setTimeout(() => {
                    navigate('/react/404');
                }, 3000); // 3초 후 리다이렉트
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

                // Toast 메시지 출력
                toast.error("위치 데이터를 저장하는 중 오류가 발생했습니다. 나중에 다시 시도해주세요.", {
                    position: "top-center",
                    autoClose: 3000,
                });

                // 에러 코드에 따라 404 또는 다른 페이지로 리다이렉트
                if (error.response && error.response.status === 404) {
                    // 404 에러인 경우 리다이렉트
                    setTimeout(() => {
                        navigate('/react/404');
                    }, 3000); // 3초 후 리다이렉트
                } else {
                    // 기타 에러 처리
                    toast.error("알 수 없는 오류가 발생했습니다.", {
                        position: "top-center",
                        autoClose: 3000,
                    });
                }
            }
        };

        saveLocation();
    }, [isAuthenticated, location, locationSaved, user, navigate]);

    useEffect(() => {
        const NEPTUNE_ORBIT_SIZE = 1500; // 기본 Neptune 궤도 크기 (예시 값)

        const init = () => {
            setTimeout(() => {
                setBodyClass('view-3D set-speed');
                // 화면 크기에 따라 처음 데이터 패널 열기 설정
                setIsDataOpen(window.innerWidth >= 1000); // 화면 크기가 1000 이상일 때, Data 패널 Open

                anime({
                    targets: '#solar-system .planet',
                    translateX: (el) => el.dataset.x,
                    translateY: (el) => el.dataset.y,
                    easing: 'easeInOutQuad',
                    duration: 2000,
                });
            }, 2000);
        };
        init();

        // 윈도우 resize 이벤트 핸들러 추가
        const handleResize = () => {
            const availableWidth = window.innerWidth * 0.7; // 창 너비의 70%를 활용 (패딩 고려)
            const scale = (availableWidth / NEPTUNE_ORBIT_SIZE);

            // 화면이 충분히 작을 때만 scaleFactor 조정
            setScaleFactor(scale < 1 ? scale : 1);
            setIsDataOpen(window.innerWidth >= 1000); // 화면 크기가 1000 이상일 때, Data 패널 Open
        };

        window.addEventListener('resize', handleResize);  // 리사이즈 이벤트 감지
        handleResize();  // 초기 크기 설정

        // 컴포넌트가 unmount 될 때 이벤트 리스너를 제거

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handlePlanetClick = (planetClass) => {
        // 이전에 클릭된 행성이 있고, 애니메이션이 아직 완료되지 않은 경우 중복 실행 방지
        if (previousPlanet && previousPlanet === planetClass) {
            return; // 이미 클릭된 행성이면 중복으로 크기 조정하지 않음
        }

        // 이전에 클릭된 행성이 있다면 그 행성 크기를 원래대로 돌리기
        if (previousPlanet) {
            anime({
                targets: `#solar-system .planet[data-planet="${previousPlanet}"]`,
                scale: [1.3, 1],  // 이전에 클릭된 행성을 원래 크기로
                duration: 1000,
                easing: 'easeInOutQuad',
            });
        }

        // 현재 클릭된 행성만 확대
        anime({
            targets: `#solar-system .planet[data-planet="${planetClass}"]`,
            scale: [1, 1.3],  // 클릭한 행성만 확대
            duration: 1000,
            easing: 'easeInOutQuad',
            complete: () => {
                // 팝업 창을 띄우는 로직 추가 (애니메이션이 완료된 후)
                setTimeout(() => {
                    openPlanetPopup(planetClass);  // 팝업을 여는 함수 실행
                }, 500);
            }
        });

        setPreviousPlanet(planetClass);  // 현재 클릭된 행성을 상태로 저장
        setSolarSystemClass(planetClass);
    };

    // 임시
    const openPlanetPopup = (planetClass) => {
        setPlanetPopupOpen(true);  // 팝업을 열림 상태로 변경

        // 팝업 애니메이션 적용 (팝업이 열릴 때)
        setTimeout(() => {
            anime({
                targets: '.planet-popup',
                scale: [0.5, 1],
                opacity: [0, 1],
                duration: 600,
                easing: 'easeOutBack',
            });
        }, 0);
    };

    const closePlanetPopup = () => {
        // 이전에 클릭된 행성의 크기를 줄이는 애니메이션
        if (previousPlanet) {
            anime({
                targets: `#solar-system .planet[data-planet="${previousPlanet}"]`,
                scale: [1.3, 1],
                duration: 1000,
                easing: 'easeInOutQuad',
                complete: () => {
                    setPreviousPlanet(null); // 팝업이 닫힌 후 previousPlanet 초기화
                }
            });
        }

        setPlanetPopupOpen(false); // 팝업 닫기
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

    // 클릭된 행성 데이터 필터링
    const selectedPlanet = planets.find(planet => planet.name.toLowerCase() === solarSystemClass.toLowerCase());

    return (
        <div id="planet-page" className={`planet-container ${bodyClass}`}>
            <div id="navbar">
                <a id="toggle-data" href="#data" onClick={(e) => {
                    e.preventDefault();
                    setIsDataOpen(!isDataOpen);
                }}>Data</a>
            </div>

            {isDataOpen && (
                <div id="data">
                    {planetsApi.map((planet) => (
                        <a
                            key={planet}
                            className={`${planet.toLowerCase()} ${solarSystemClass === planet.toLowerCase() ? "active" : ""}`}
                            onClick={() => handlePlanetClick(planet.toLowerCase())}
                            href={`#${planet.toLowerCase()}speed`}
                        >
                            {planet}
                        </a>
                    ))}
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
    );
};

export default PlanetPage;
