// AuthProvider.js

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import createAxiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    const getAccessToken = () => localStorage.getItem("accessToken");
    const getRefreshToken = () => localStorage.getItem("refreshToken");

    // Axios 인스턴스 생성 및 관리
    const axiosInstance = createAxiosInstance(async () => {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        }
    });

    // Access Token 갱신 로직
    const refreshAccessToken = async () => {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            console.log("[ERROR] Refresh token missing. Logging out.");
            logout();
            return null;
        }

        try {
            const response = await axios.post(
                "/api/member/refresh",
                {}, // 요청 본문 비움
                {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const { accessToken, userId } = response.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("userId", userId);

            // Axios 인스턴스에 Authorization 헤더 업데이트
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

            console.log(`[SUCCESS] Access Token 갱신 성공. UserId: ${userId}, AccessToken: ${accessToken}`);
            return accessToken;
        } catch (error) {
            console.error("[ERROR] Failed to refresh access token:", error);
            logout();
            return null;
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            setIsAuthLoading(true);
            const token = getAccessToken();
            const userId = localStorage.getItem("userId");

            if (token) {
                try {
                    const decoded = jwtDecode(token);

                    if (decoded.exp * 1000 > Date.now()) {
                        setIsAuthenticated(true);

                        // 사용자 프로필 데이터 추가 가져오기
                        const response = await axiosInstance.get(`/api/member/${userId}`);
                        const userProfile = response.data;

                        setUser({ ...decoded, userId, nickname: userProfile.nickname });

                        // Axios 인스턴스에 Authorization 헤더 설정
                        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                    } else {
                        await refreshAccessToken();
                    }
                } catch (error) {
                    console.error("JWT decoding failed:", error);
                    logout();
                }
            }
            else {
                setIsAuthenticated(false);
            }
            setIsAuthLoading(false);
        };

        initializeAuth();
    }, []);

    // 인증 상태 변경 시 Authorization 헤더 관리
    useEffect(() => {
        if (isAuthenticated) {
            const token = getAccessToken();
            if (token) {
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                console.log("[INFO] Authorization 헤더 추가됨.");
            }
        } else {
            delete axiosInstance.defaults.headers.common["Authorization"];
            console.log("[INFO] Authorization 헤더 제거됨.");
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const interval = setInterval(async () => {
            const token = getAccessToken();
            if (token) {
                const decoded = jwtDecode(token);
                const timeUntilExpiration = decoded.exp * 1000 - Date.now();

                console.log(`[DEBUG] Time left for token expiration: ${timeUntilExpiration / 1000}s`);

                if (timeUntilExpiration < 180000 && timeUntilExpiration > 0) { // 3분 미만
                    console.log("[INFO] Access Token 만료 임박. 갱신 시도...");
                    await refreshAccessToken();
                } else if (timeUntilExpiration <= 0) {
                    console.warn("[WARNING] Access Token expired!");
                    logout();
                }
            }
        }, 300000); // 5분 간격

        return () => clearInterval(interval);
    }, []);

    const logout = async () => {
        console.log("Logging out...");
        const accessToken = getAccessToken();

        if (accessToken) {
            try {
                const response = await axios.post("/api/member/logout", {}, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    console.log("Server logout successful.");
                } else {
                    console.warn("Server logout failed:", response.status);
                }
            } catch (error) {
                console.error("Error during logout request:", error);
            }
        }

        // Local Storage와 Axios 인스턴스 정리
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        delete axiosInstance.defaults.headers.common["Authorization"];

        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, isAuthLoading, logout, axiosInstance }}>
            {children}
        </AuthContext.Provider>
    );
};

// AuthContext 사용 훅 정의
export const useAuth = () => {
    return useContext(AuthContext);
};
