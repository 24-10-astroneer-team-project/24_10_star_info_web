// src/api/axiosInstance.js

import axios from "axios";

const axiosInstance = axios.create();

// 인터셉터로 Authorization 헤더 추가
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;