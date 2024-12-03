// src/api/axiosInstance.js

import axios from "axios";
import jwtDecode from "jwt-decode";

const createAxiosInstance = (refreshAccessToken) => {
    const instance = axios.create({
        baseURL: "http://localhost:7777", // 기본 URL
    });

    // 요청 인터셉터 추가
    instance.interceptors.request.use(
        async (config) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                const decoded = jwtDecode(token);
                const timeUntilExpiration = decoded.exp * 1000 - Date.now();

                console.log(`[INFO] Time until expiration: ${timeUntilExpiration}ms`);

                if (timeUntilExpiration < 30000) { // Access Token 만료 30초 전
                    console.log("[INFO] Access Token 만료 임박. 갱신 시도...");
                    const newAccessToken = await refreshAccessToken();
                    if (newAccessToken) {
                        config.headers.Authorization = `Bearer ${newAccessToken}`;
                    }
                } else {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    //남은 시간 콘솔에 출력
    setInterval(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            const decoded = jwtDecode(token);
            const timeUntilExpiration = decoded.exp * 1000 - Date.now();

            if (timeUntilExpiration > 0) {
                console.log(`[DEBUG] Time left for token expiration: ${timeUntilExpiration / 1000}s`);
            } else {
                console.warn("[WARNING] Access Token expired!");
            }
        }
    }, 300000); // 5분 간격으로 실행

    return instance;
};

export default createAxiosInstance;
