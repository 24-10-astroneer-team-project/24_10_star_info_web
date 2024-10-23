import React from 'react';
import stylesFirst from '../main1/firstSection.module.css';
import EarthAnimation from '../main2/EarthAnimation';
import stylesSecond from '../main2/EarthSection.module.css'; // 올바른 파일명으로 수정

function MainPage() {
    return (
        <div style={{ width: '100%', height: '300vh' }}>
            {/* 첫 번째 섹션 */}
            <div className={stylesFirst.firstSection}>
                <div className={stylesFirst.firstSectionText}>
                    Hello earthling
                </div>
            </div>

            {/* 두 번째 섹션: Earth Animation */}
            <div className={stylesSecond.earthSection}> {/* 수정된 CSS 클래스 적용 */}
                <EarthAnimation />
            </div>

            {/* 세 번째 섹션: Solar System */}

        </div>
    );
}

export default MainPage;