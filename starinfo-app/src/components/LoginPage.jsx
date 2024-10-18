import React from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import LogoutButton from "./LogoutButton";
import Head from "./layout/Head";
import Foot from "./layout/Foot";

function LoginPage() {
    return (

        <div>
            <Head />
            <h1>Login Pagffhyyyggytyyex</h1>
            {/* Google 로그인 버튼 */}
            <GoogleLoginButton />

            {/* 로그아웃 버튼 */}
            <LogoutButton />
            <Foot/>
        </div>
    );
}

export default LoginPage;
