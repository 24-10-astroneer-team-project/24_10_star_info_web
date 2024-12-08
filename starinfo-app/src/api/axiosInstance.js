// src/api/axiosInstance.js

import axios from "axios";

let isRefreshing = false; // 토큰 갱신 중인지 확인
let failedQueue = []; // 대기열에 실패한 요청 추가

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token); // 성공 시 토큰으로 요청 진행
        } else {
            prom.reject(error); // 실패 시 오류 전달
        }
    });
    failedQueue = []; // 대기열 초기화
};

const axiosInstance = axios.create({
    baseURL: "https://www.astro.qyef.site/", // 기본 URL
    withCredentials: true, // 쿠키 전송 허용
});

axiosInstance.interceptors.response.use(
    (response) => response, // 성공 응답 그대로 반환
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;

                try {
                    console.log("[INFO] Access Token 갱신 요청 중...");
                    const response = await axios.post("/api/auth/refresh-from-cookie", {}, { withCredentials: true });

                    console.log("[SUCCESS] Access Token 갱신 성공.");
                    const newAccessToken = response.data.accessToken;

                    // 새로운 토큰을 대기열의 요청에 적용
                    processQueue(null, newAccessToken);
                    isRefreshing = false;

                    // 요청에 새로운 Access Token 적용
                    return axiosInstance({
                        ...originalRequest,
                        headers: {
                            ...originalRequest.headers,
                            Authorization: `Bearer ${newAccessToken}`,
                        },
                    });
                } catch (refreshError) {
                    console.error("[ERROR] Access Token 갱신 실패:", refreshError);
                    processQueue(refreshError, null); // 모든 대기 중인 요청 실패 처리
                    isRefreshing = false;
                    return Promise.reject(refreshError);
                }
            } else {
                // 이미 갱신 요청 중인 경우 대기열에 추가
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            resolve(axiosInstance(originalRequest));
                        },
                        reject: (err) => reject(err),
                    });
                });
            }
        }

        return Promise.reject(error); // 다른 오류는 그대로 반환
    }
);

export default axiosInstance;
