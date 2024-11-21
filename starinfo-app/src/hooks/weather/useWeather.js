// useWeather.js

import { useState, useEffect } from "react";
import axios from "axios";

function useWeather(location) {
    const [weatherData, setWeatherData] = useState(null);
    const [weatherLoading, setWeatherLoading] = useState(true);
    const [weatherError, setWeatherError] = useState(null);

    useEffect(() => {
        if (!location) return;

        const fetchWeather = async () => {
            setWeatherLoading(true);
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_WEATHER_API_URL}`,
                    {
                        params: {
                            lat: location.latitude,
                            lon: location.longitude,
                            units: "metric", // 섭씨 단위
                            exclude: "minutely,hourly", // 필요 없는 데이터 제외
                            appid: process.env.REACT_APP_WEATHER_API_KEY,
                        },
                    }
                );
                setWeatherData(response.data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
                setWeatherError(error);
            } finally {
                setWeatherLoading(false);
            }
        };

        fetchWeather();
    }, [location]);

    return { weatherData, weatherLoading, weatherError };
}

export default useWeather;
