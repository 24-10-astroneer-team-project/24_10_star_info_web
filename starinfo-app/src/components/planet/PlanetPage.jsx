import React, { useEffect, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import SolarSystem from './SolarSystem';
import Head from "../layout/Head";
import Foot from "../layout/Foot";

import { useAuth } from '../../services/AuthProvider'; // 인증 훅
import useUserLocation from '../../hooks/useUserLocation'; // 위치 정보 훅
import useSaveLocation from "../../hooks/useSaveLocation";
import useFetchPlanets from "../../hooks/planets/useFetchPlanets";

import LoadingSpinner from '../ui/LoadingSpinner';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation 추가
import { PlanetPopup, planets } from './PlanetPopup';
// Popup 컴포넌트와 행성 데이터 임포트
import './PlanetPage.css';

const PlanetPage = () => {
    const { location, isLoading } = useUserLocation(); // 위치 정보
    const { isAuthenticated, user } = useAuth(); // 인증 정보
    const { saveLocation, locationSaved } = useSaveLocation(); // 위치 저장 훅
    const { planetData, dataLoading, fetchError } = useFetchPlanets(location, isLoading); // 행성 데이터 훅

    const [bodyClass, setBodyClass] = useState("opening hide-UI view-2D zoom-large data-close controls-close");
    const [solarSystemClass, setSolarSystemClass] = useState("earth");
    const [isDataOpen, setIsDataOpen] = useState(false);
    const [isManuallyOpened, setIsManuallyOpened] = useState(false); // 수동으로 열렸는지 여부
    const [previousPlanet, setPreviousPlanet] = useState(null);
    const [isPlanetPopupOpen, setPlanetPopupOpen] = useState(false);
    const [scaleFactor, setScaleFactor] = useState(1);

    const navigate = useNavigate();
    const locationSearch = useLocation(); // URL 파라미터를 가져오기 위해 useLocation 사용

    const today = new Date().toISOString().split("T")[0];
    const rangeDays = "1";

    // URL에서 선택된 행성을 읽어 팝업 자동 열기
    useEffect(() => {
        const queryParams = new URLSearchParams(locationSearch.search);
        const selectedPlanetName = queryParams.get('selectedPlanet'); // URL에서 selectedPlanet 파라미터 읽기

        if (selectedPlanetName) {
            const planet = planets.find(
                (p) => p.name.toLowerCase() === selectedPlanetName.toLowerCase()
            );

            if (planet) {
                setSolarSystemClass(selectedPlanetName.toLowerCase());
                setPreviousPlanet(selectedPlanetName.toLowerCase());
                setPlanetPopupOpen(true);
            }
        }
    }, [locationSearch.search]);

    // 위치 저장 로직
    useEffect(() => {
        if (isAuthenticated && location && !locationSaved) {
            saveLocation(user?.id, location);
        }
    }, [isAuthenticated, location, locationSaved, saveLocation, user?.id]);

    // planetData 로그 출력
    useEffect(() => {
        if (!dataLoading) {
            console.log("Fetched Planet Data:", planetData);
        }
    }, [dataLoading, planetData]);

    useEffect(() => {
        const NEPTUNE_ORBIT_SIZE = 1500; // 기본 Neptune 궤도 크기 (예시 값)

        const init = () => {
            setTimeout(() => {
                setBodyClass('view-3D set-speed');

                // 초기 상태 설정
                if (isManuallyOpened) {
                    setIsDataOpen(window.innerWidth >= 1000);
                }

                anime({
                    targets: '#solar-system .planet',
                    translateX: (el) => el.dataset.x,
                    translateY: (el) => el.dataset.y,
                    easing: 'easeInOutQuad',
                    duration: 2000,
                });
            }, 2000);
        };

        const handleResize = () => {
            const availableWidth = window.innerWidth * 0.65;
            const scale = availableWidth / NEPTUNE_ORBIT_SIZE;

            setScaleFactor(scale < 1 ? scale : 1);

            if (!isManuallyOpened) {
                setIsDataOpen(window.innerWidth >= 1000);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        init();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleToggleData = (e) => {
        e.preventDefault();
        setIsManuallyOpened((prev) => !prev);
        setIsDataOpen((prev) => !prev);
    };

    const handlePlanetClick = (planetClass) => {
        if (previousPlanet && previousPlanet === planetClass) return;

        if (previousPlanet) {
            anime({
                targets: `#solar-system .planet[data-planet="${previousPlanet}"]`,
                scale: [1.3, 1],
                duration: 1000,
                easing: 'easeInOutQuad',
            });
        }

        anime({
            targets: `#solar-system .planet[data-planet="${planetClass}"]`,
            scale: [1, 1.3],
            duration: 1000,
            easing: 'easeInOutQuad',
            complete: () => {
                setTimeout(() => openPlanetPopup(planetClass), 500);
            }
        });

        setPreviousPlanet(planetClass);
        setSolarSystemClass(planetClass);
    };

    const openPlanetPopup = (planetClass) => {
        setPlanetPopupOpen(true);
        setTimeout(() => {
            anime({
                targets: '.planet-popup',
                scale: [0.5, 1],
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutBack',
            });
        }, 0);
    };

    const closePlanetPopup = () => {
        if (previousPlanet) {
            anime({
                targets: `#solar-system .planet[data-planet="${previousPlanet}"]`,
                scale: [1.3, 1],
                duration: 1000,
                easing: 'easeInOutQuad',
                complete: () => setPreviousPlanet(null),
            });
        }
        setPlanetPopupOpen(false);
    };

    if (isLoading || dataLoading) {
        console.log("Loading state active. Waiting for data...");
        return <LoadingSpinner />;
    }

    const selectedPlanet = planets.find(
        (planet) => planet.name.toLowerCase() === solarSystemClass.toLowerCase()
    );

    return (
        <>
            <div className="header">
                <Head />
            </div>
            <div id="planet-page" className={`planet-container ${bodyClass}`}>
                <div id="navbar">
                    <a id="toggle-data" href="#data" onClick={handleToggleData}>
                        Data
                    </a>
                </div>

                {isDataOpen && (
                    <div id="data">
                        {planets.map((planet) => (
                            <a
                                key={planet.id}
                                className={`${planet.name.toLowerCase()} ${
                                    solarSystemClass === planet.name.toLowerCase()
                                        ? 'active'
                                        : ''
                                }`}
                                onClick={() => handlePlanetClick(planet.name.toLowerCase())}
                                href={`#${planet.name.toLowerCase()}speed`}
                            >
                                {planet.name}
                            </a>
                        ))}
                    </div>
                )}

                <div id="universe" className="scale-stretched">
                    <div id="galaxy" style={{ transform: `scale(${scaleFactor})` }}>
                        <SolarSystem
                            solarSystemClass={solarSystemClass}
                            handlePlanetClick={handlePlanetClick}
                        />
                    </div>
                </div>

                <PlanetPopup
                    selectedPlanet={selectedPlanet}
                    isPlanetPopupOpen={isPlanetPopupOpen}
                    closePlanetPopup={closePlanetPopup}
                />
            </div>

            <div className="footer">
                <Foot />
            </div>
        </>
    );
};

export default PlanetPage;
