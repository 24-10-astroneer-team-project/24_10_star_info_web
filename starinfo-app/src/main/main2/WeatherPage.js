// src/main2/WeatherPage.js
import React from 'react';
import styles from './WeatherPage.module.css';
import Main_Button from '../../components/layout/Main_Button'; // 임시추가'
function WeatherPage() {
    const handleButtonClick = () => {
         window.location.href = 'https://www.naver.com'; // Redirect to Naver
     };
    return (
        <div className={styles.bg}>
            {/* 상단의 'Local Weather App' 텍스트만 표시 */}
            <h1 className={styles.textCenter}>Local Weather App</h1>
            <Main_Button onClick={handleButtonClick} />
        </div>
    );
}

export default WeatherPage;