// GoogleAuthHandler.js

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleAuthHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const accessToken = queryParams.get("accessToken");
        const refreshToken = queryParams.get("refreshToken");

        if (accessToken && refreshToken) {
            // 로컬스토리지에 저장
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            console.log("Tokens saved successfully");

            // 토큰 저장 후 메인 페이지로 리다이렉트
            navigate("/react/main");
        } else {
            console.error("No tokens found in query params");
            navigate("/login"); // 인증 실패 시 로그인 페이지로 리다이렉트
        }
    }, [navigate]);

    return <div>Authenticating...</div>; // 로딩 화면 또는 처리 중 메시지
};

export default GoogleAuthHandler;
