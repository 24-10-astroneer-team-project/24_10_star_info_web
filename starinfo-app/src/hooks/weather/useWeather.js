// useWeather.js

import { useState, useEffect } from "react";
import axios from "axios";

function useWeather(location, authState) {
    const [weatherData, setWeatherData] = useState(null);
    const [weatherLoading, setWeatherLoading] = useState(true);
    const [weatherError, setWeatherError] = useState(null);
    const [cityName, setCityName] = useState("Unknown City"); // 도시 이름 상태 추가

    useEffect(() => {
        if (!location) return; // 위치 정보가 없으면 실행하지 않음

        const fetchWeather = async () => {
            setWeatherLoading(true);
            try {
                // One Call API 호출
                const weatherResponse = await axios.get(
                    `${process.env.REACT_APP_WEATHER_API_URL}`,
                    {
                        params: {
                            lat: location.latitude,
                            lon: location.longitude,
                            units: "metric",
                            exclude: "minutely,hourly", // 필요 없는 데이터 제외
                            appid: process.env.REACT_APP_WEATHER_API_KEY,
                        },
                    }
                );

                // Current Weather Data API 호출 (도시 이름 가져오기)
                const cityResponse = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather`,
                    {
                        params: {
                            lat: location.latitude,
                            lon: location.longitude,
                            appid: process.env.REACT_APP_WEATHER_API_KEY,
                        },
                    }
                );

                setWeatherData(weatherResponse.data);
                setCityName(cityResponse.data.name); // 도시 이름 설정
            } catch (error) {
                console.error("Error fetching weather data:", error);
                setWeatherError(error);
            } finally {
                setWeatherLoading(false);
            }
        };

        fetchWeather();
    }, [location, authState]); // authState 추가

    return { weatherData, weatherLoading, weatherError, cityName };
}

export default useWeather;
