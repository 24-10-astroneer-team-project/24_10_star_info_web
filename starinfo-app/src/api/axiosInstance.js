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
            if (!token) {
                console.warn("[INFO] No Access Token available. Skipping Authorization header.");
                return config; // 헤더 추가하지 않고 반환
            }

            const decoded = jwtDecode(token);
            const timeUntilExpiration = decoded.exp * 1000 - Date.now();

            console.log(`[INFO] Time until expiration: ${timeUntilExpiration}ms`);

            if (timeUntilExpiration < 30000) { // Access Token 만료 30초 전
                try {
                    console.log("[INFO] Access Token 만료 임박. 갱신 시도...");
                    const newAccessToken = await refreshAccessToken();
                    if (newAccessToken) {
                        config.headers.Authorization = `Bearer ${newAccessToken}`;
                    } else {
                        console.warn("[WARNING] Failed to refresh Access Token.");
                    }
                } catch (error) {
                    console.error("[ERROR] Access Token refresh failed:", error);
                    // 선택적으로 요청 중단하거나 기본 헤더 없이 요청 진행
                }
            } else {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error) => Promise.reject(error)
    );

    return instance;
};

export default createAxiosInstance;
