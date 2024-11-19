// AuthProvider.js

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트 정의
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(undefined); // 초기값 undefined로 설정
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/member/me")
            .then(response => {
                if (response.data) {
                    setIsAuthenticated(true);
                    setUser(response.data);
                    console.log("User data set:", response.data);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                    console.log("No user data found.");
                }
            })
            .catch(() => {
                setIsAuthenticated(false);
                setUser(null);
                console.log("Failed to fetch user data.");
            })
            .finally(() => {
                setIsAuthLoading(false); // 인증 상태 확인 완료 후 로딩 상태 변경
            });
    }, []);


    // 로그인 함수 (백엔드와 연동)
    const login = async (credentials) => {
        try {
            const response = await axios.post("/api/member/login", credentials); // 백엔드 로그인 API 호출
            setIsAuthenticated(true);
            setUser(response.data); // 로그인 성공 시 사용자 정보 설정
        } catch (error) {
            console.error("로그인 실패", error);
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    // 로그아웃 함수 (백엔드와 연동)
    const logout = async () => {
        try {
            await axios.post("/api/member/logout"); // 백엔드 로그아웃 API 호출
            setIsAuthenticated(false);
            setUser(null); // 로그아웃 시 사용자 정보 제거
        } catch (error) {
            console.error("로그아웃 실패", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, isAuthLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// AuthContext 사용 훅 정의
export const useAuth = () => {
    return useContext(AuthContext);
};