import React, { useEffect, useRef } from 'react';
import styles from '../main1/SecondSection.module.css';  // CSS 모듈 불러오기

function MainPage() {
    const textRef = useRef(null);

    useEffect(() => {
        // 텍스트 애니메이션 시작 또는 기타 이펙트 추가 가능
    }, []);

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            {/* 첫 번째 세션 */}
            <div className={styles.secondSection}>
                <div className={styles.secondSectionText}>
                    Hello earthling
                </div>
            </div>
        </div>
    );
}

export default MainPage;