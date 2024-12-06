// src/main2/WeatherPage.js

import React, { useEffect, useState } from 'react';
import styles from './WeatherPage.module.css';
import useUserLocation from '../../../../hooks/useUserLocation'; // 위치 데이터 훅
import useWeather from '../../../../hooks/weather/useWeather'; // 날씨 데이터 훅
import WeatherCard from './WeatherCard';

function WeatherPage() {
    const { location, locationLoading } = useUserLocation();
    const [searchCity, setSearchCity] = useState(""); // 도시 이름 입력 상태
    const [cityToSearch, setCityToSearch] = useState(null); // 검색할 도시 이름
    const { weatherData, weatherLoading, weatherError, cityName } = useWeather(location, cityToSearch, locationLoading);

    const handleSearch = () => {
        if (searchCity.trim()) {
            setCityToSearch(searchCity.trim());
        }
    };

    // 로딩 상태 처리
    if (locationLoading || weatherLoading || !location) {
        return (
            <div className={`${styles.bg} weather-page`}>
                <p>Loading...</p>
            </div>
        );
    }

    // 에러 상태 처리
    if (weatherError) {
        return (
            <div className={`${styles.bg} weather-page`}>
                <p>날씨 데이터를 가져오는 데 문제가 발생했습니다.</p>
            </div>
        );
    }

    return (
        <div className={`${styles.bg} weather-page`}>
            {/* 제목 */}
            <h1 className={styles.weatherTitle}>
                7-Day Weather Forecast for {cityName || "Unknown City"}
            </h1>

            {/* 검색 입력 필드 */}
            <div className={styles.weatherSearchContainer}>
                <input
                    type="text"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    placeholder="도시 이름을 입력하세요"
                    className={styles.weatherSearchInput}
                />
                <button onClick={handleSearch} className={styles.weatherSearchButton}>
                    검색
                </button>
            </div>

            {/* 날씨 카드 */}
            <div className={styles.cardContainer}>
                {weatherData?.daily?.slice(0, 7).map((day, index) => (
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
