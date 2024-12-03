// useWeather.js

import { useState, useEffect } from "react";
import axios from "axios";

function isKorean(text) {
    const koreanRegex = /[가-힣]/;
    return koreanRegex.test(text);
}

function useWeather(location, searchCity, locationLoading, authState) {
    const [weatherData, setWeatherData] = useState(null);
    const [weatherLoading, setWeatherLoading] = useState(true);
    const [weatherError, setWeatherError] = useState(null);
    const [cityName, setCityName] = useState("Unknown City");

    useEffect(() => {
        // 위치가 아직 로딩 중이거나 위치와 검색된 도시 이름이 둘 다 없으면 실행하지 않음
        if (locationLoading || (!location && !searchCity)) return;

        const fetchWeather = async () => {
            setWeatherLoading(true);
            try {
                let lat, lon;
                let weatherResponse;
                const lang = searchCity && isKorean(searchCity) ? "kr" : "en"; // 언어 설정 (한글 감지)

                if (searchCity) {
                    // Geocoding API를 사용해 도시 이름으로 좌표 가져오기
                    const geoResponse = await axios.get(
                        `https://api.openweathermap.org/geo/1.0/direct`,
                        {
                            params: {
                                q: searchCity,
                                limit: 1,
                                appid: process.env.REACT_APP_WEATHER_API_KEY,
                            },
                        }
                    );

                    if (geoResponse.data.length > 0) {
                        lat = geoResponse.data[0].lat;
                        lon = geoResponse.data[0].lon;
                        setCityName(geoResponse.data[0].name); // 도시 이름 설정
                    } else {
                        throw new Error("도시 이름을 찾을 수 없습니다.");
                    }
                } else if (location) {
                    // 위치 정보가 있는 경우
                    lat = location.latitude;
                    lon = location.longitude;

                    // 위치 기반으로 도시 이름 가져오기 (Current Weather Data API)
                    const cityResponse = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather`,
                        {
                            params: {
                                lat: lat,
                                lon: lon,
                                appid: process.env.REACT_APP_WEATHER_API_KEY,
                                lang: lang,
                            },
                        }
                    );

                    if (cityResponse.data && cityResponse.data.name) {
                        setCityName(cityResponse.data.name); // 도시 이름 설정
                    } else {
                        setCityName("Unknown City");
                    }
                }

                // One Call API로 날씨 데이터 가져오기
                weatherResponse = await axios.get(
                    `${process.env.REACT_APP_WEATHER_API_URL}`,
                    {
                        params: {
                            lat: lat,
                            lon: lon,
                            units: "metric",
                            exclude: "minutely,hourly",
                            appid: process.env.REACT_APP_WEATHER_API_KEY,
                            lang: lang,
                        },
                    }
                );

                setWeatherData(weatherResponse.data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
                setWeatherError(error);
            } finally {
                setWeatherLoading(false);
            }
        };

        fetchWeather();
    }, [location, searchCity, locationLoading, authState]);

    return { weatherData, weatherLoading, weatherError, cityName };
}

export default useWeather;
