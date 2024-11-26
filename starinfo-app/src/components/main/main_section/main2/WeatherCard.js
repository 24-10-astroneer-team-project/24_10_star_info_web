// WeatherCard.js

import React from 'react';
import styles from './WeatherCard.module.scss'; // WeatherCard용 CSS 모듈

// 아이콘 매핑 테이블
const weatherIcons = {
    Clear: "fa-sun",
    Clouds: "fa-cloud",
    Rain: "fa-cloud-showers-heavy",
    Drizzle: "fa-cloud-rain",
    Thunderstorm: "fa-bolt",
    Snow: "fa-snowflake",
    Mist: "fa-smog",
    Smoke: "fa-smog",
    Haze: "fa-smog",
    Dust: "fa-smog",
    Fog: "fa-smog",
    Sand: "fa-smog",
    Ash: "fa-smog",
    Squall: "fa-wind",
    Tornado: "fa-wind",
    Hot: "fa-temperature-high",
    Cold: "fa-temperature-low",
};

function WeatherCard({ weatherData, timezone, cityName }) {
    // 날짜 변환
    const date = new Date(weatherData.dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        timeZone: timezone,
    });

    // 날씨 데이터
    const maxTemp = Math.round(weatherData.temp.max);
    const minTemp = Math.round(weatherData.temp.min);
    const weatherCondition = weatherData.weather[0]?.main || "Unknown";
    const weatherDescription = weatherData.weather[0]?.description || "No description";
    const iconClass = weatherIcons[weatherCondition] || "fa-question";

    // 배경 색상 및 아이콘 색상 설정
    const backgroundColor =
        weatherCondition === "Clear"
            ? "#f7dc6f" // 맑은 날씨
            : weatherCondition === "Rain" || weatherCondition === "Drizzle"
                ? "#85c1e9" // 비 오는 날씨
                : weatherCondition === "Thunderstorm"
                    ? "#5dade2" // 폭풍우
                    : weatherCondition === "Snow"
                        ? "#d6eaf8" // 눈
                        : "#f0f4f8"; // 기본 배경색

    const iconColor =
        weatherCondition === "Clear"
            ? "#f39c12"
            : weatherCondition === "Rain" || weatherCondition === "Drizzle"
                ? "#3498db"
                : weatherCondition === "Thunderstorm"
                    ? "#1f618d"
                    : weatherCondition === "Snow"
                        ? "#5dade2"
                        : "#7f8c8d";

    return (
        <div
            className={styles.box}
            style={{ background: backgroundColor }}
        >
            <div className={`${styles.wave} ${styles['-one']}`}></div>
            <div className={`${styles.wave} ${styles['-two']}`}></div>
            <div className={`${styles.wave} ${styles['-three']}`}></div>
            <div className={styles.weathercon}>
                <i
                    className={`fas ${iconClass}`}
                    style={{ color: iconColor }}
                ></i>
            </div>
            <div className={styles.info}>
                <h2 className={styles.city}>{cityName}</h2> {/* 도시 이름 표시 */}
                <h3 className={styles.date}>{date}</h3>
                <p className={styles.temp}>{`High: ${maxTemp} °C / Low: ${minTemp} °C`}</p>
                <p className={styles.description}>{weatherDescription}</p>
            </div>
        </div>
    );
}

export default WeatherCard;
