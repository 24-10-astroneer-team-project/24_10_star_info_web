// AuthProvider.js

import React, { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    const getAccessToken = () => localStorage.getItem("accessToken");
    const getRefreshToken = () => localStorage.getItem("refreshToken");

    // Access Token 갱신 로직
    const refreshAccessToken = async () => {
        const refreshToken = getRefreshToken();
        console.log(`[DEBUG] Refresh Token: ${refreshToken}`);

        if (!refreshToken) {
            console.warn("No refresh token found. User needs to log in again.");
            logout(); // Refresh Token 없으면 로그아웃 처리
            return null;
        }

        try {
            const response = await axiosInstance.post("/api/member/refresh", {
                refreshToken,
            });

            const { accessToken } = response.data;
            console.log("[DEBUG] New Access Token:", accessToken);

            // 새로운 Access Token 저장 및 상태 업데이트
            localStorage.setItem("accessToken", accessToken);
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            return accessToken;
        } catch (error) {
            console.error("[ERROR] Access Token refresh failed:", error);
            logout(); // 실패 시 로그아웃 처리
            return null;
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            const token = getAccessToken();
            const userId = localStorage.getItem("userId"); // userId 가져오기
            console.log("Stored token:", token);
            console.log("Stored userId:", userId);

            if (!token) {
                console.log("No access token found");
                setIsAuthenticated(false);
                setUser(null);
                setIsAuthLoading(false); // 로딩 상태 완료
                return;
            }

            try {
                const decoded = jwtDecode(token);
                console.log("Decoded token:", decoded);

                const timeUntilExpiration = decoded.exp * 1000 - Date.now();
                console.log(`[DEBUG] Time until expiration: ${timeUntilExpiration}ms`);

                if (timeUntilExpiration > 0) {
                    setIsAuthenticated(true);
                    setUser({ ...decoded, userId }); // userId 포함하여 상태 저장
                    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                    // 만료 임박 시 갱신
                    if (timeUntilExpiration < 300000) {
                        console.log("[INFO] Access Token 만료 임박. 갱신 시도...");
                        await refreshAccessToken();
                    }
                } else {
                    console.warn("Access token expired");
                    await refreshAccessToken(); // 만료된 경우 갱신 시도
                }
            } catch (error) {
                console.error("Invalid JWT token:", error);
                logout(); // 잘못된 토큰인 경우 로그아웃
            } finally {
                setIsAuthLoading(false); // 로딩 상태 완료
            }
        };

        initializeAuth();
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
