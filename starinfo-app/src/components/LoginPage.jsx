import React from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import LogoutButton from "./LogoutButton";

function LoginPage() {
    return (
        <div>
            <h1>Login Pagex</h1>
            {/* Google 로그인 버튼 */}
            <GoogleLoginButton />

            {/* 로그아웃 버튼 */}
            <LogoutButton />
        </div>
    );
}

export default LoginPage;
