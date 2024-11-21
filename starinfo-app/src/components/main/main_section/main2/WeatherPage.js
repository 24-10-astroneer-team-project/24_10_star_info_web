// src/main2/WeatherPage.js

import React, {useEffect, useState} from 'react';
import styles from './WeatherPage.module.css';
import useUserLocation from '../../../../hooks/useUserLocation'; // 위치 데이터 훅
import useWeather from '../../../../hooks/weather/useWeather'; // 날씨 데이터 훅
import { useAuth } from '../../../../services/AuthProvider'; // 인증 상태 훅
import LoadingSpinner from "../../../ui/LoadingSpinner";
import WeatherCard from './WeatherCard';

function WeatherPage() {
    const { location, locationLoading } = useUserLocation();
    const { isAuthenticated } = useAuth(); // 인증 상태 가져오기
    const { weatherData, weatherLoading, weatherError, cityName } = useWeather(location, isAuthenticated); // cityName 추가
    const [renderKey, setRenderKey] = useState(0); // 강제 재렌더링 키

    useEffect(() => {
        // 로그인 상태가 변경되면 강제 재렌더링
        setRenderKey((prevKey) => prevKey + 1);
    }, [isAuthenticated]);

    if (locationLoading || weatherLoading) {
        return (
            <div className={`${styles.bg} weather-page`}>
                <LoadingSpinner />
            </div>
        );
    }

    if (weatherError) {
        return (
            <div className={`${styles.bg} weather-page`}>
                <p>날씨 데이터를 가져오는 데 문제가 발생했습니다.</p>
            </div>
        );
    }

    return (
        <div className={`${styles.bg} weather-page`}>
            <h1 className={styles.title}>7-Day Weather Forecast for {cityName}</h1> {/* 도시 이름 표시 */}
            <div className={styles.cardContainer}>
                {weatherData.daily.slice(0, 7).map((day, index) => (
                    <WeatherCard
                        key={index}
                        weatherData={day}
                        timezone={weatherData.timezone}
                        cityName={cityName} // 도시 이름 전달
                    />
                ))}
            </div>
        </div>
    );
}

export default WeatherPage;