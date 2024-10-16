import React from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import AstroAnimation from "../pixi/AstroAnimation"; // 애니메이션 컴포넌트 추가

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
                <GoogleLoginButton style={{
                    padding: "15px 30px", // 버튼 크기를 조정
                    fontSize: "50px", // 텍스트 크기
                    borderRadius: "10px", // 테두리 둥글게
                    border: "none", // 테두리 없애기
                    backgroundColor: "#4285F4", // 구글 로그인 버튼 스타일
                    color: "#ffffff", // 글자 색상
                    cursor: "pointer", // 커서 스타일
                    marginTop: "20px" // 간격 추가
                }} />
            </div>
        </div>
    );
}

export default LoginPage;