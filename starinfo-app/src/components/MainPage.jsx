// src/MainPage.js
import React, { useEffect, useRef, useState } from 'react';
import './MainPage.css';
import stylesFirst from '../main/main1/firstSection.module.css';
import WeatherPage from '../main/main2/WeatherPage';
import stylesThird from '../main/main3/ThirdSection.css';
import SolarSystem from '../main/main3/SolarSystem.jsx';
import WaveCanvas from '../main/main4/WaveCanvas';
import ConstellationSection from '../main/main5/ConstellationSection';
import Head from "./layout/Head";
import Foot from "./layout/Foot";

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

            <div style={{ overflow: 'hidden', height: '100vh', position: 'relative' }}>
                <div ref={containerRef} style={{ width: '100%', transition: 'transform 0.7s ease' }}>
                    <div ref={(el) => (sections.current[0] = el)} className={stylesFirst.firstSection} style={{ height: '100vh' }}>
                        <div className={stylesFirst.firstSectionText}>Hello Earthling</div>
                    </div>
                    <div ref={(el) => (sections.current[1] = el)} style={{ height: '100vh' }}>
                        <WeatherPage />
                    </div>
                    <div ref={(el) => (sections.current[2] = el)} className={stylesThird.solarSystemSection} style={{ height: '100vh' }}>
                        <SolarSystem />
                    </div>
                    <div ref={(el) => (sections.current[3] = el)} style={{ height: '100vh', backgroundColor: 'black' }}>
                        <WaveCanvas />
                    </div>
                    <div ref={(el) => (sections.current[4] = el)} style={{ height: '100vh' }}>
                        <ConstellationSection />
                    </div>
                </div>

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
