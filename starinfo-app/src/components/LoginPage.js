import React from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import LogoutButton from "./LogoutButton";
import AstroAnimation from "../pixi/AstroAnimation"; // 애니메이션 컴포넌트 추가
import './LoginPage.css'; // CSS 파일 추가

function LoginPage() {
    return (
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
            {/* Astro 애니메이션 */}
            <AstroAnimation />

            {/* 로그인 화면 요소 */}
            <div className="login-container" style={{ position: "absolute", top: 0, left: 0, width: "100%", zIndex: 1 }}>
                <h2 className="login-title">로그인 방법을 선택해주세요</h2>

                {/* Google 로그인 버튼 */}
                <GoogleLoginButton />

            </div>
        </div>
    );
}

export default LoginPage;