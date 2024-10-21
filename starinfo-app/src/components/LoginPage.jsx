import React from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import LogoutButton from "./LogoutButton";

function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-xl font-bold text-center mb-6">LogoName</h1>

                {/* Google 로그인 버튼 */}
                <GoogleLoginButton />

                {/* 로그아웃 버튼 */}
                <LogoutButton />
            </div>
        </div>
    );
}

export default LoginPage;
