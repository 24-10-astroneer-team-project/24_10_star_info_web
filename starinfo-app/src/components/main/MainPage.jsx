import React, { useEffect, useRef, useState } from 'react';
import './MainPage.css';
import stylesFirst from './main_section/main1/firstSection.module.css';
import WeatherPage from "./main_section/main2/WeatherPage";
import styleThird from './main_section/main3/ThirdSection.css';
import SolarSystem_main from "./main_section/main3/SolarSystem_main";
import WaveCanvas from "./main_section/main4/WaveCanvas";
import MoonPhase from "./main_section/main5/MoonPhase";
import RotatingPolygonSection from "./main_section/main6/Constellation";
import Head from "../layout/Head";
import Foot from "../layout/Foot";
import {toast} from "react-toastify";
import {useAuth} from "../../services/AuthProvider";
import LogoutButton from "../member/LogoutButton";
import {useLocation, useNavigate} from "react-router-dom";

function MainPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sections = useRef([]);
    const isScrolling = useRef(false);
    const containerRef = useRef(null);
    const { isAuthenticated } = useAuth();
    const routerLocation = useLocation();
    const navigate = useNavigate();

    // 로그인 메시지 표시
    useEffect(() => {
        const hasShownLoginToast = sessionStorage.getItem("hasShownLoginSuccess");

        if (isAuthenticated && !hasShownLoginToast) {
            toast.success("로그인에 성공했습니다!", {
                position: "top-center",
                autoClose: 2000, // 2초 후 닫힘
            });
            sessionStorage.setItem("hasShownLoginSuccess", "true"); // 메시지가 출력되었음을 기록
        }
    }, [isAuthenticated]);

    // 로그아웃 메시지 표시
    useEffect(() => {
        if (routerLocation.state?.fromLogout) {
            toast.info("로그아웃 되었습니다.", {
                position: "top-center",
                autoClose: 2000,
            });

            // 메시지를 한 번만 표시하고 상태를 초기화
            navigate('/react/main', { replace: true, state: {} });
        }
    }, [routerLocation, navigate]);

    useEffect(() => {
        const handleScroll = (event) => {
            if (isScrolling.current) return;
            isScrolling.current = true;

            let newIndex = currentIndex;
            if (event.deltaY > 0) {
                newIndex = Math.min(currentIndex + 1, sections.current.length - 1);
            } else {
                newIndex = Math.max(currentIndex - 1, 0);
            }

            if (newIndex !== currentIndex) {
                setCurrentIndex(newIndex);
            }

            setTimeout(() => {
                isScrolling.current = false;
            }, 500);
        };

        window.addEventListener('wheel', handleScroll, { passive: false });

        return () => window.removeEventListener('wheel', handleScroll);
    }, [currentIndex]);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.transform = `translateY(-${currentIndex * 100}vh)`;
            containerRef.current.style.transition = 'transform 0.7s ease';
        }
    }, [currentIndex]);

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <>
            {/* 모든 섹션에서 헤더가 보이도록 고정 */}
            <Head />
            <div style={{ overflow: 'hidden', height: '100vh', position: 'relative' }}>
                <div ref={containerRef} style={{ width: '100%', transition: 'transform 0.7s ease' }}>
                    {/* 각 섹션 */}
                    <div ref={(el) => (sections.current[0] = el)} className={stylesFirst.firstSection} style={{ height: '100vh' }}>
                        <div className={stylesFirst.firstSectionText}>Hello earthling</div>
                        <div>
                            <LogoutButton />
                        </div>
                    </div>
                    <div ref={(el) => (sections.current[1] = el)} style={{ height: '100vh' }}>
                        <WeatherPage />
                    </div>
                    <div ref={(el) => (sections.current[2] = el)} className={styleThird.solarSystemSection} style={{ height: '100vh' }}>
                        <SolarSystem_main />
                    </div>
                    <div ref={(el) => (sections.current[3] = el)} style={{ height: '100vh', backgroundColor: 'black' }}>
                        <WaveCanvas />
                    </div>
                    {/* MoonPhase 섹션 */}
                    <div ref={(el) => (sections.current[4] = el)} style={{ height: '100vh', backgroundColor: 'black' }}>
                        <MoonPhase />
                    </div>
                    <div ref={(el) => (sections.current[5] = el)} style={{ height: '100vh', position: 'relative' }}>
                        <RotatingPolygonSection />
                        {/* 푸터는 마지막 섹션 하단에 고정 */}
                        <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                            <Foot />
                        </div>
                    </div>
                </div>

                {/* Dot Navigation */}
                <div className="dot-navigation">
                    {sections.current.map((_, index) => (
                        <div
                            key={index}
                            className={`dot ${currentIndex === index ? 'active' : ''}`}
                            onClick={() => handleDotClick(index)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default MainPage;
