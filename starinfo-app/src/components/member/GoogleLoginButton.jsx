// GoogleLoginButton.jsx

import React from "react";
import "./css/GoogleLoginButton.css";
import {motion} from "framer-motion";

const GoogleLoginButton = () => {
    const googleLogin = () => {
        console.log("%c[INFO] Google 로그인 시도 중...", "color: blue");
        const backendUrl =
            process.env.REACT_APP_BACKEND_URL || "http://localhost:7777";
        window.location.href = `${backendUrl}/oauth2/authorization/google`; // Google OAuth2 로그인 경로
    };

    return (
        <motion.button
            onClick={googleLogin}
            className="google-login-button"
            whileHover={{scale: 1.1}} // 호버 시 확대
            whileTap={{scale: 0.9}} // 클릭 시 축소
        >
            <div className="bc-logo">
                <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    className="google-logo"
                    alt="Google logo"
                />
            </div>
            <span className="login-text">Sign in with Google</span>
        </motion.button>
    );
};

export default GoogleLoginButton;