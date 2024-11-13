import React, {useEffect, useRef, useState} from 'react';
import './MainPage.css';
import stylesFirst from './main_section/main1/firstSection.module.css';
import WeatherPage from "./main_section/main2/WeatherPage";
import styleThird from './main_section/main3/ThirdSection.css';
import SolarSystem_main from "./main_section/main3/SolarSystem_main";
import WaveCanvas from "./main_section/main4/WaveCanvas";
import ConstellationSection from "./main_section/main5/ConstellationSection";
import Head from "../layout/Head";
import Foot from "../layout/Foot";

function MainPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sections = useRef([]);
    const isScrolling = useRef(false);
    const containerRef = useRef(null);

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
                    <div ref={(el) => (sections.current[4] = el)} style={{ height: '100vh', position: 'relative' }}>
                        <ConstellationSection />
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
