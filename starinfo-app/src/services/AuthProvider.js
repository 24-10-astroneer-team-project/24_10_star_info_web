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

    // Access Token 갱신 로직
    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            console.log("[ERROR] Refresh token missing. Logging out.");
            logout();
            return null;
        }

        try {
            const response = await axios.post(
                "/api/member/refresh",
                {}, // 요청 본문은 비움
                {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`, // Authorization 헤더에 리프레시 토큰 포함
                        "Content-Type": "application/json", // JSON 형식 명시
                    },
                }
            );

            const { accessToken, userId } = response.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("userId", userId);

            console.log(`[SUCCESS] Access Token 갱신 성공. UserId: ${userId}, AccessToken: ${accessToken}`);
            return accessToken;
        } catch (error) {
            console.error("[ERROR] Failed to refresh access token:", error);
            logout();
            return null;
        }
    };


    // Axios 인스턴스 생성
    const axiosInstance = createAxiosInstance(refreshAccessToken);

    useEffect(() => {
        const initializeAuth = async () => {
            setIsAuthLoading(true);
            const token = getAccessToken();
            const userId = localStorage.getItem("userId"); // userId 가져오기

            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    if (decoded.exp * 1000 > Date.now()) {
                        setIsAuthenticated(true);
                        setUser({ ...decoded, userId }); // userId 포함
                    } else {
                        await refreshAccessToken();
                    }
                } catch (error) {
                    console.error("JWT decoding failed:", error);
                    logout();
                }
            } else {
                setIsAuthenticated(false);
            }
            setIsAuthLoading(false);
        };

        initializeAuth();
    }, []);

    // Access Token 만료 확인 및 갱신 로직
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
                    logout(); // 만료된 경우 로그아웃
                }
            }
        }, 300000); // 5분 간격으로 실행

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 해제
    }, []);

    const logout = async () => {
        console.log("Logging out...");

        const accessToken = getAccessToken();
        console.log(`[DEBUG] Access Token: ${accessToken}`);

        if (accessToken) {
            try {
                const response = await fetch("/api/member/logout", {
                    method: "POST",
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

        // 로컬 상태 초기화
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId"); // userId 저장
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, isAuthLoading, logout, refreshAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// AuthContext 사용 훅 정의
export const useAuth = () => {
    return useContext(AuthContext);
};
