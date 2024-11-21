// useWeather.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const useWeather = (latitude, longitude) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_WEATHER_API_URL}`,
                    {
                        params: {
                            lat: latitude,
                            lon: longitude,
                            exclude: 'minutely,hourly', // 필요한 데이터만 선택
                            units: 'metric', // 섭씨 사용
                            appid: process.env.REACT_APP_WEATHER_API_KEY,
                        },
                    }
                );
                setWeatherData(response.data);
            } catch (err) {
                console.error('Error fetching weather data:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (latitude && longitude) {
            fetchWeatherData();
        }
    }, [latitude, longitude]);

    return { weatherData, loading, error };
};

export default useWeather;
