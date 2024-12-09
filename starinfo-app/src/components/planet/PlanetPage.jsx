// PlanetPage.jsx

import React, {useEffect, useState} from 'react';
import SolarSystem from './SolarSystem';

import {useAuth} from '../../services/AuthProvider'; // 인증 훅
import useUserLocation from '../../hooks/useUserLocation'; // 위치 정보 훅
import useSaveLocation from "../../hooks/useSaveLocation";
import useFetchPlanets from "../../hooks/planets/useFetchPlanets";

import LoadingSpinner from '../ui/LoadingSpinner';
import './css/PlanetPage.css';
import PlanetLocationButton from "./PlanetLocationButton";

const PlanetPage = () => {
    const {location, isLoading} = useUserLocation(); // 위치 정보
    const {isAuthenticated, user} = useAuth(); // 인증 정보
    const {saveLocation, locationSaved} = useSaveLocation(); // 위치 저장 훅
    const {planetData = {}, dataLoading, fetchError} = useFetchPlanets(location, isLoading);

    const [bodyClass, setBodyClass] = useState("opening hide-UI view-2D zoom-large data-close controls-close");
    const [solarSystemClass, setSolarSystemClass] = useState("earth");
    const [isDataOpen, setIsDataOpen] = useState(false);
    const [isManuallyOpened, setIsManuallyOpened] = useState(false); // 수동으로 열렸는지 여부
    const [scaleFactor, setScaleFactor] = useState(1);
    console.log("PlanetPage - Current location:", location);

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
                ;
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

    if (isLoading || dataLoading) {
        console.log("Loading state active. Waiting for data...");
        return <LoadingSpinner/>;
    }

    return (
        <>
            <div id="planet-page">
                <div id="navbar">
                    <a id="toggle-data" href="#data">
                        Data
                    </a>
                </div>

                <div id="universe" className="scale-stretched">
                    <div id="galaxy">
                        <SolarSystem
                            solarSystemClass={solarSystemClass}
                        />
                    </div>
                </div>
            </div>
            <PlanetLocationButton
                planetData={planetData}
                locationDescription={location?.description || '정보 없음'}
            /> {/* planetData 전달 */}
        </>
    );
};

export default PlanetPage;