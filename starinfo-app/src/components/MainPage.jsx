import React, { useEffect, useRef } from 'react';
import stylesFirst from '../main1/firstSection.module.css';


function MainPage() {
    return (
        <div style={{ width: '100%', height: '200vh' }}> {/* 전체 200vh로 구성 */}

            {/* 첫 번째 섹션 */}
            <div className={stylesFirst.firstSection}>
                <div className={stylesFirst.firstSectionText}>
                    Hello earthling
                </div>
            </div>


            {/* 두 번째 섹션 */}
            <div>
                <div >
                    Hello Universe
                </div>
            </div>

        </div>
    );
}

export default MainPage;