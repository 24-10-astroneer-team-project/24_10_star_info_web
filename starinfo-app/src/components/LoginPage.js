import React from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import LogoutButton from "./LogoutButton";
import './LoginPage.css';  // CSS 파일 추가

function LoginPage() {
    return (
        <div className="login-container">
            <h2 className="login-title">로그인 방법을 선택해주세요</h2>
            {/* Google 로그인 버튼 */}
            <GoogleLoginButton />

            {/* 로그아웃 버튼 */}
            <LogoutButton />
        </div>
    );
}

export default LoginPage;