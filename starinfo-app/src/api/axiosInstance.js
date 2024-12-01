// src/api/axiosInstance.js

import axios from "axios";
import { useAuth } from "../services/AuthProvider";
import jwtDecode from "jwt-decode";

const axiosInstance = axios.create({
    baseURL: "http://localhost:7777", // 필요한 경우 기본 URL 추가
});

// 인터셉터로 Access Token 자동 갱신 로직 포함
axiosInstance.interceptors.request.use(
    async (config) => {
        const auth = useAuth(); // AuthProvider에서 제공하는 context 사용
        const token = localStorage.getItem("accessToken");

        if (token) {
            const decoded = jwtDecode(token);
            const timeUntilExpiration = decoded.exp * 1000 - Date.now(); // 만료까지 남은 시간 계산

            if (timeUntilExpiration < 300000) { // Access Token 만료 5분 전
                console.log("[INFO] Access Token 만료 임박. 갱신 시도...");
                const newAccessToken = await auth.refreshAccessToken();
                if (newAccessToken) {
                    config.headers.Authorization = `Bearer ${newAccessToken}`;
                }
            } else {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
