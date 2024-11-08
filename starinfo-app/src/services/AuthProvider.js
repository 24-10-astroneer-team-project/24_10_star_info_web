// AuthProvider.js

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트 정의
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // 로그인 상태 확인 (백엔드와 연동)
    useEffect(() => {
        // 페이지 로드 시 로그인 상태 확인
        axios.get("/api/member/me")
            .then(response => {
                if (response.data) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            })
            .catch(() => setIsAuthenticated(false));
    }, []);

    // 로그인 함수 (백엔드와 연동)
    const login = async (credentials) => {
        try {
            await axios.post("/api/member/login", credentials); // 백엔드 로그인 API 호출
            setIsAuthenticated(true);
        } catch (error) {
            console.error("로그인 실패", error);
            setIsAuthenticated(false);
        }
    };

    // 로그아웃 함수 (백엔드와 연동)
    const logout = async () => {
        try {
            await axios.post("/api/member/logout"); // 백엔드 로그아웃 API 호출
            setIsAuthenticated(false);
        } catch (error) {
            console.error("로그아웃 실패", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// AuthContext 사용 훅 정의
export const useAuth = () => {
    return useContext(AuthContext);
};
