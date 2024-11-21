// src/main2/WeatherPage.js

import React from 'react';
import styles from './WeatherPage.module.css';
import useUserLocation from '../../../../hooks/useUserLocation'; // 위치 데이터 훅
import useWeather from '../../../../hooks/weather/useWeather'; // 날씨 데이터 훅
import LoadingSpinner from "../../../ui/LoadingSpinner";
import WeatherCard from './WeatherCard'; // 분리된 WeatherCard 컴포넌트

function WeatherPage() {
    const { location, locationLoading } = useUserLocation();
    const { weatherData, weatherLoading, weatherError } = useWeather(location);

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

    // 도시 이름 설정 (timezone or 지정된 필드 사용)
    const cityName = weatherData.timezone?.split("/")?.[1]?.replace("_", " ") || "Unknown City";

    return (
        <div className={`${styles.bg} weather-page`}>
            <h1 className={styles.title}>7-Day Weather Forecast</h1>
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
