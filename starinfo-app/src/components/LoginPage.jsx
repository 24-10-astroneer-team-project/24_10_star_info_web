import React, {useEffect} from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import AstroAnimation from '../pixi/AstroAnimation.js'; // 애니메이션 컴포넌트 추가
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../services/AuthProvider";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";

function LoginPage() {

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            toast.info("이미 로그인된 상태입니다. 메인 페이지로 이동합니다.", {
                position: "top-center",
                autoClose: 2000, // 3초 후 자동으로 닫힘
                style: {
                    zIndex: 9999, // 다른 요소보다 높게 설정
                },
            });

            // 토스트 메시지 후 메인 페이지로 리다이렉트
            setTimeout(() => {
                navigate("/react/main");
            }, 2000); // 2초 후 리다이렉트
        }
    }, [isAuthenticated, navigate]);

    return (
        <div style={{position: "relative", width: "100%", height: "100vh", overflow: "hidden"}}>
            {/* Astro 애니메이션 */}
            <AstroAnimation/>

            {/* 로그인 화면 요소 */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                zIndex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.6)",  // 반투명한 검은색 배경으로 애니메이션과 구분
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",  // 텍스트 색상을 흰색으로 변경
            }}>
                <h2>로그인 방법을 선택해주세요</h2>
                {/* Google 로그인 버튼 */}
                {/* 스타일을 인라인에서 설정하지 않고, CSS 클래스 사용 */}
                <GoogleLoginButton className="google-login-button"/>
            </div>
        </div>
    );
}

export default LoginPage;
