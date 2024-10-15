import React from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import LogoutButton from "./LogoutButton";
import AstroAnimation from "./AstroAnimation"; // 애니메이션 추가

function LoginPage() {
    return (
        <div>
            <AstroAnimation /> {/* 배경 애니메이션 */}
            <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                <h1>로그인 방법을 선택해주세요</h1>
                {/* Google 로그인 버튼 */}
                <GoogleLoginButton />
                {/* 로그아웃 버튼 */}
                <LogoutButton />
            </div>
        </div>
    );
}

export default LoginPage;