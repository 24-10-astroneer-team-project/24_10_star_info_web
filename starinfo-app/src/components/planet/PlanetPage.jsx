import React, {useEffect, useState} from 'react';
import anime from 'animejs/lib/anime.es.js';
import SolarSystem from './SolarSystem';
import './Planet.css';

const planets = [
    { id: '1', name: 'Mercury', diameter: '3,031.67 mi', moons: 'none', desc: 'Mercury is the closest planet to the Sun. Due to its proximity, it\'s not easily seen except during twilight. For every two orbits of the Sun, Mercury completes three rotations about its axis. Up until 1965 it was thought that the same side of Mercury constantly faced the Sun.', url: 'img/mercury.jpg' },
    { id: '2', name: 'Venus', diameter: '7,521 mi', moons: 'none', desc: 'Venus is the second planet from the Sun and is the second brightest object in the night sky after the Moon. Venus is the second largest terrestrial planet and is sometimes referred to as the Earth’s sister planet due the their similar size and mass.', url: 'img/venus.jpg' },
    { id: '3', name: 'Earth', diameter: '7,917.5 mi', moons: '1', desc: 'Earth is the third planet from the Sun and is the largest of the terrestrial planets. The Earth is the only planet in our solar system not to be named after a Greek or Roman deity. The Earth was formed approximately 4.54 billion years ago and is the only known planet to support life.', url: 'img/earth.jpg' },
    { id: '4', name: 'Mars', diameter: '4,212 mi', moons: '2', desc: 'The fourth planet from the Sun and the second smallest planet in the solar system. Mars is often described as the "Red Planet" due to its reddish appearance. It\'s a terrestrial planet with a thin atmosphere composed primarily of carbon dioxide.', url: 'img/mars.jpg' },
    { id: '5', name: 'Jupiter', diameter: '86,881.4 mi', moons: '79', desc: 'The planet Jupiter is the fifth planet out from the Sun, and is two and a half times more massive than all the other planets in the solar system combined. It is made primarily of gases and is therefore known as a "gas giant".', url: 'img/jupiter.jpg' },
    { id: '6', name: 'Saturn', diameter: '72,367.4 mi', moons: '62', desc: 'Saturn is the sixth planet from the Sun and the most distant that can be seen with the naked eye. Saturn is the second largest planet and is best known for its fabulous ring system that was first observed in 1610 by the astronomer Galileo Galilei.', url: 'img/saturn.jpg' },
    { id: '7', name: 'Uranus', diameter: '31,518 mi', moons: '27', desc: 'Uranus is the seventh planet from the Sun. While being visible to the naked eye, it was not recognised as a planet due to its dimness and slow orbit. Uranus became the first planet discovered with the use of a telescope.', url: 'img/uranus.jpg' },
    { id: '8', name: 'Neptune', diameter: '30,599 mi', moons: '14', desc: 'Neptune is the eighth planet from the Sun making it the most distant in the solar system. This gas giant planet may have formed much closer to the Sun in early solar system history before migrating to its present position.', url: 'img/neptune.jpg' }
];

// PlanetCard 컴포넌트 정의 (카드 형태의 정보 표시)
const PlanetCard = ({ name, diameter, moons, desc, url }) => (
    <div className="card">
        <div>
            <img src={url} alt={`${name} image`} />
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
    const [bodyClass, setBodyClass] = useState('opening hide-UI view-2D zoom-large data-close controls-close');
    const [solarSystemClass, setSolarSystemClass] = useState('earth');
    const [isDataOpen, setIsDataOpen] = useState(false);
    const [previousPlanet, setPreviousPlanet] = useState(null);  // 이전에 클릭된 행성 추적
    const [isPlanetPopupOpen, setPlanetPopupOpen] = useState(false);
    const [scaleFactor, setScaleFactor] = useState(1);  // Scale factor 상태 추가

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
                        />
                        {/*<button className="popup-close-button" onClick={closePlanetPopup}>닫기</button>*/}
                    </div>
                </div>
            )}
            {/* 팝업 창 조건부 렌더링 */}
            {isPlanetPopupOpen && (
                <div className="planet-popup-bc" onClick={closePlanetPopup}>
                    <div className="planet-popup" onClick={(e) => e.stopPropagation()}>
                        <div className="popup-content">
                            <h2>{solarSystemClass} 정보</h2>
                            <p>{solarSystemClass}에 대한 자세한 내용을 여기에 표시합니다.</p>
                            <button className="popup-close-button" onClick={closePlanetPopup}>닫기</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default PlanetPage;

