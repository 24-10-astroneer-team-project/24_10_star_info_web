// useWeather.js

import { useState, useEffect } from "react";
import axios from "axios";

function useWeather(initialLocation, searchCity, locationLoading) {
    const [weatherData, setWeatherData] = useState(null);
    const [weatherLoading, setWeatherLoading] = useState(true);
    const [weatherError, setWeatherError] = useState(null);
    const [cityName, setCityName] = useState("Unknown City");
    const [location, setLocation] = useState(null); // location 초기화
    const [isLocationSet, setIsLocationSet] = useState(false); // 초기 위치 설정 플래그

    useEffect(() => {

        if (locationLoading) {
            console.log("Location is still loading. Waiting...");
            return;
        }

        // 초기 위치 설정
        if (!isLocationSet && initialLocation) {
            // console.log("Setting location from initialLocation:", initialLocation);
            setLocation(initialLocation); // location 설정
            setIsLocationSet(true); // 위치 설정 완료 플래그
            return; // 설정 후 바로 요청하지 않음
        }

        // 요청 실행 조건: location이 설정된 이후 또는 검색된 도시가 있을 때
        if (!location && !searchCity) {
            // console.log("No location or searchCity provided. Skipping weather fetch.");
            setWeatherLoading(false);
            return;
        }

        if (!isLocationSet) {
            // console.log("Waiting for location to be fully set...");
            return; // location이 완전히 설정되기 전까지 대기
        }

        const fetchWeather = async () => {
            console.log("Fetching weather data...");
            setWeatherLoading(true);
            try {
                let lat, lon;
                let lang = searchCity && /[가-힣]/.test(searchCity) ? "kr" : "en";

                if (searchCity) {
                    // 검색된 도시 기준으로 위도, 경도 가져오기
                    // console.log("Fetching coordinates for searchCity:", searchCity);
                    const geoResponse = await axios.get(
                        "https://api.openweathermap.org/geo/1.0/direct",
                        {
                            params: { q: searchCity, limit: 1, appid: process.env.REACT_APP_WEATHER_API_KEY },
                        }
                    );
                    if (geoResponse.data.length > 0) {
                        lat = geoResponse.data[0].lat;
                        lon = geoResponse.data[0].lon;
                        setCityName(geoResponse.data[0].name);
                        // console.log("Fetched coordinates for searchCity:", { lat, lon });
                    } else {
                        throw new Error("City not found.");
                    }
                } else if (location) {
                    // 위치 기반 날씨 데이터 가져오기
                    // console.log("Using location for weather fetch:", location);
                    lat = location.latitude;
                    lon = location.longitude;

                    const cityResponse = await axios.get(
                        "https://api.openweathermap.org/data/2.5/weather",
                        {
                            params: { lat, lon, appid: process.env.REACT_APP_WEATHER_API_KEY, lang },
                        }
                    );
                    setCityName(cityResponse.data?.name || "Unknown City");
                    console.log("City name fetched:", cityResponse.data?.name || "Unknown City");
                }

                const weatherResponse = await axios.get(
                    process.env.REACT_APP_WEATHER_API_URL,
                    {
                        params: {
                            lat,
                            lon,
                            units: "metric",
                            exclude: "minutely,hourly",
                            appid: process.env.REACT_APP_WEATHER_API_KEY,
                            lang,
                        },
                    }
                );

                setWeatherData(weatherResponse.data);
                // console.log("Weather data fetched successfully:", weatherResponse.data);
            } catch (error) {
                console.error("Weather fetch error:", error);
                setWeatherError(error);
            } finally {
                setWeatherLoading(false);
            }
        };

        fetchWeather();
    }, [location, searchCity, locationLoading, initialLocation, isLocationSet]);

    return { weatherData, weatherLoading, weatherError, cityName };
}

export default useWeather;
