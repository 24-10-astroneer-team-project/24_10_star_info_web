// src/main2/WeatherPage.js
import React from 'react';
import styles from './WeatherPage.module.css';

function WeatherPage() {
    return (
        <div className={styles.bg}>
            {/* 상단의 'Local Weather App' 텍스트만 표시 */}
            <h1 className={styles.textCenter}>Local Weather App</h1>
        </div>
    );
}

export default WeatherPage;