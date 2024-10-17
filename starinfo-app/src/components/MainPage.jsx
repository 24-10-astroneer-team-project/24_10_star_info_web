import React, { useEffect, useRef } from 'react';
<<<<<<< HEAD
import stylesFirst from '../main/firstSection.module.css'; // 첫 번째 섹션 CSS

=======
import styles from '../main1/SecondSection.module.css';  // CSS 모듈 불러오기
>>>>>>> 2eeeae88 (merge 요청 login,mainpage 구현 중)

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