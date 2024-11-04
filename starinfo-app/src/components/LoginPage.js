import React from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import AstroAnimation from '../pixi/AstroAnimation.js'; // 애니메이션 컴포넌트 추가

function LoginPage() {
    return (
        <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
            {/* Astro 애니메이션 */}
            <AstroAnimation />

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
                <GoogleLoginButton className="google-login-button" />
            </div>
        </div>
    );
}

export default LoginPage;