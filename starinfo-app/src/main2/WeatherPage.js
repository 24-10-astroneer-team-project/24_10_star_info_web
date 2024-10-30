// src/main2/WeatherPage.js
import React, { useEffect, useState } from 'react';
import styles from './WeatherPage.module.css';

function WeatherPage() {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        // 현재 시간 설정
        const updateClock = () => {
            setCurrentTime(new Date().toLocaleString());
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.bg}>
            {/* 상단의 'Local Weather App' 텍스트만 표시 */}
            <h1 className={styles.textCenter}>Local Weather App</h1>
        </div>
    );
}

export default WeatherPage;