import React from 'react';

const GoogleLoginButton = () => {
    const googleLogin = () => {
        console.log('%c[INFO] Google 로그인 시도 중...', 'color: blue');
        const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:7777";
        window.location.href = `${backendUrl}/oauth2/authorization/google`;  // Google OAuth2 로그인 경로
    };

    return (
        <button
            onClick={googleLogin}
            style={{
                fontSize: "16px",
                fontWeight: "bold",
                padding: "12px 24px",
                backgroundColor: "#4285F4",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
            }}
        >
            Google 로그인
        </button>
    );
};

export default GoogleLoginButton;