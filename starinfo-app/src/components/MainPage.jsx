import React from 'react';
import stylesFirst from '../main1/firstSection.module.css';
import WeatherPage from '../main2/WeatherPage'; // WeatherPage 컴포넌트 추가
import stylesThird from '../main3/ThirdSection.css'; // 세 번째 섹션의 CSS 모듈
import SolarSystem from '../main3/SolarSystem.jsx';
import WaveCanvas from '../main4/WaveCanvas'; // WaveCanvas 컴포넌트


function MainPage() {
    return (
        <div style={{width: '100%', overflow: 'hidden'}}>
            {/* 첫 번째 섹션 */}
            <div className={stylesFirst.firstSection}>
                <div className={stylesFirst.firstSectionText}>
                    Hello earthling
                </div>
            </div>


            {/* 두 번째 섹션 - WeatherPage */}
            <div style={{ width: '100%', height: '100vh' }}>
                <WeatherPage />
            </div>

            {/* 세 번째 섹션 */}
            <div className={stylesThird.solarSystemSection}> {/* 독립적인 CSS 모듈로 스타일 격리 */}
                <SolarSystem/>
            </div>

            {/* 네 번째 섹션 */}
            <div style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor:'black' }}>
                <WaveCanvas /> {/* 애니메이션만 추가 */}
            </div>

            {/* 다섯 번째 섹션 - 첫 번째 섹션과 같은 스타일과 텍스트 효과 */}
            <div className={stylesFirst.firstSection}>
                <div className={stylesFirst.firstSectionText}>
                    Journey Continues...
                </div>
            </div>
        </div>

    );
}

export default MainPage;
