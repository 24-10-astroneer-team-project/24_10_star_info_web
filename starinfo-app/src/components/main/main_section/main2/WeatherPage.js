// src/main2/WeatherPage.js

import React, { useEffect, useState } from 'react';
import styles from './WeatherPage.module.css';
import useUserLocation from '../../../../hooks/useUserLocation'; // 위치 데이터 훅
import useWeather from '../../../../hooks/weather/useWeather'; // 날씨 데이터 훅
import { useAuth } from '../../../../services/AuthProvider'; // 인증 상태 훅
import WeatherCard from './WeatherCard';

function WeatherPage() {
    const { location, locationLoading } = useUserLocation();
    const { isAuthenticated } = useAuth(); // 인증 상태 가져오기
    const [searchCity, setSearchCity] = useState(""); // 도시 이름 입력 상태 추가
    const [cityToSearch, setCityToSearch] = useState(null); // 검색을 위해 사용할 도시 이름 저장
    const { weatherData, weatherLoading, weatherError, cityName } = useWeather(location, cityToSearch, locationLoading, isAuthenticated); // locationLoading 추가
    const [renderKey, setRenderKey] = useState(0); // 강제 재렌더링 키

    useEffect(() => {
        // 로그인 상태가 변경되면 강제 재렌더링
        setRenderKey((prevKey) => prevKey + 1);
    }, [isAuthenticated]);

    const handleSearch = () => {
        // 검색 버튼 클릭 시 도시 이름 설정
        setCityToSearch(searchCity);
    };

    if (locationLoading || weatherLoading) {
        return (
            <div className={`${styles.bg} weather-page`}>
                <p>Loading...</p>
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
            <h1 className={styles.weatherTitle}>7-Day Weather Forecast for {cityName}</h1> {/* 도시 이름 표시 */}

            {/* 도시 이름 검색 입력 필드와 버튼 추가 */}
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