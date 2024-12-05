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

    // Axios 인스턴스 생성 및 관리
    const axiosInstance = createAxiosInstance(async () => {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        }
    });

    // Access Token 갱신 로직
    const refreshAccessToken = async () => {
        const accessToken = localStorage.getItem("accessToken");
        let userId = null;

        // 만료된 토큰 디코딩으로 userId 확인 시도
        if (accessToken) {
            try {
                const decoded = jwtDecode(accessToken);
                userId = decoded.userId; // JWT에 포함된 userId 추출
            } catch (error) {
                console.warn("[WARN] 만료된 Access Token 디코딩 실패:", error);
            }
        }

        // 로컬 스토리지에서 userId 확인
        if (!userId) {
            userId = localStorage.getItem("userId");
        }

        if (!userId) {
            console.error("[ERROR] 사용자 식별 정보 없음. 로그아웃 처리.");
            logout();
            return null;
        }

        try {
            // 사용자 ID를 포함한 요청 전송
            const response = await axios.post(
                "/api/member/refresh",
                { userId },
                { headers: { "Content-Type": "application/json" } }
            );

            const { accessToken } = response.data;

            // 새 액세스 토큰 저장
            localStorage.setItem("accessToken", accessToken);

            console.log("[SUCCESS] Access Token 갱신 성공:", accessToken);
            return accessToken;
        } catch (error) {
            console.error("[ERROR] Access Token 갱신 실패:", error);
            logout(); // 실패 시 로그아웃 처리
            return null;
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            setIsAuthLoading(true);

            const accessToken = getAccessToken();

            if (accessToken) {
                // Access Token이 존재하면 인증 상태 확인
                try {
                    const decoded = jwtDecode(accessToken);
                    if (decoded.exp * 1000 > Date.now()) {
                        setIsAuthenticated(true);
                        setUser(decoded);
                        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
                    } else {
                        console.log("[INFO] Access Token 만료됨. 갱신 시도...");
                        await refreshAccessToken();
                    }
                } catch (error) {
                    console.error("[ERROR] Access Token 확인 중 오류:", error);
                    logout();
                }
            } else {
                // Access Token이 없으면 갱신 요청
                console.log("[INFO] Access Token 없음. Redis에서 Refresh Token 확인 시도...");
                try {
                    const newAccessToken = await refreshAccessToken();
                    if (newAccessToken) {
                        setIsAuthenticated(true);
                    } else {
                        console.log("[INFO] 사용자 인증 실패. 로그인 필요.");
                        logout();
                    }
                } catch (error) {
                    console.error("[ERROR] Redis Refresh Token 확인 중 오류:", error);
                    logout();
                }
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
        }, 120000); // 2분 간격

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
