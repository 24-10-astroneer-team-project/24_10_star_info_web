// AuthProvider.js

import React, { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axiosInstance from "../api/axiosInstance";

// AuthContext 생성
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        console.log("Stored token:", token); // 디버깅용 로그

        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log("Decoded token:", decoded); // 디버깅용 로그

                if (Date.now() < decoded.exp * 1000) { // 토큰 만료 확인
                    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                    console.log("Authorization header set:", axiosInstance.defaults.headers.common["Authorization"]); // 디버깅용 로그
                    setIsAuthenticated(true);
                    setUser(decoded);
                } else {
                    console.warn("Access token expired");
                    logout(); // 만료된 경우 로그아웃
                }
            } catch (error) {
                console.error("Invalid JWT token:", error);
                logout(); // 잘못된 토큰인 경우 로그아웃
            }
        } else {
            console.log("No access token found");
            setIsAuthenticated(false);
            setUser(null);
        }
        setIsAuthLoading(false); // 로딩 상태 완료
    }, []);

    const logout = async () => {
        console.log("Logging out...");

        const accessToken = localStorage.getItem("accessToken");
        console.log(`[DEBUG] Access Token: ${accessToken}`);

        if (accessToken) {
            try {
                const response = await fetch('/api/member/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
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

        // 100ms 딜레이 후 로컬 상태 초기화
        setTimeout(() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setIsAuthenticated(false);
            setUser(null);
        }, 100);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, isAuthLoading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// AuthContext 사용 훅 정의
export const useAuth = () => {
    return useContext(AuthContext);
};
