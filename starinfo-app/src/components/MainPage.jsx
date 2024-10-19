import React from 'react';
import stylesFirst from '../main1/firstSection.module.css';
import EarthAnimation from '../main2/EarthAnimation';

function MainPage() {
    return (
        <div style={{ width: '100%', height: '200vh' }}>
            {/* 첫 번째 섹션 */}
            <div className={stylesFirst.firstSection}>
                <div className={stylesFirst.firstSectionText}>
                    Hello earthling
                </div>
            </div>

            {/* 두 번째 섹션: Earth Animation */}
            <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
                <EarthAnimation />
            </div>
        </div>
    );
}

export default MainPage;