// AuthProvider.js

import axios from "axios";
import React, {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    // Access Token 갱신 로직
    const refreshAccessToken = async () => {
        try {
            console.log("[INFO] 쿠키 기반 Access Token 갱신 시도...");
            const response = await axios.post(
                "/api/auth/refresh-from-cookie",
                {}, // 요청 본문 없이 쿠키만 사용
                { withCredentials: true } // 쿠키 전송 허용
            );

            console.log("[SUCCESS] Access Token 갱신 성공");
            return response.data.accessToken;
        } catch (error) {
            console.error("[ERROR] Access Token 갱신 실패. 로그아웃 처리.");
            logout(); // 모든 방법이 실패하면 로그아웃 처리
            return null;
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            setIsAuthLoading(true);

            try {
                // 서버에서 인증 상태 확인
                const response = await axios.get("/api/auth/check", {
                    withCredentials: true, // 쿠키 전송 허용
                });

                const { isAuthenticated, userInfo } = response.data;
                console.log("[INFO] 인증 상태 확인 성공:", response.data);

                setIsAuthenticated(isAuthenticated);
                setUser({ ...userInfo, userId: response.data.userId });
                // userId를 로컬 스토리지에 저장
                if (response.data.userId > 0) {
                    localStorage.setItem("userId", response.data.userId);
                    console.log("[INFO] userId 저장 완료:", response.data.userId);
                }
            } catch (error) {
                console.error("[ERROR] 인증 상태 확인 실패:", error);
                logout();
            }

            setIsAuthLoading(false);
        };

        initializeAuth();
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                console.log("[INFO] Access Token 갱신 시도...");
                await refreshAccessToken();
            } catch (error) {
                console.error("[ERROR] Access Token 갱신 중 오류:", error);
                logout();
            }
        }, 120000); // 2분 간격

        return () => clearInterval(interval);
    }, []);

    const logout = async () => {
        console.log("[INFO] Logging out...");

        try {
            await axios.post("/api/member/logout", {}, { withCredentials: true });
            console.log("[SUCCESS] 서버 로그아웃 성공");
        } catch (error) {
            console.error("[ERROR] 서버 로그아웃 실패:", error);
        }

        // 로컬 스토리지 정리
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("userId");
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