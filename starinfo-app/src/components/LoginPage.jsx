import React from "react";

import GoogleLoginButton from "./GoogleLoginButton";
import LogoutButton from "./LogoutButton";
import Head from "./layout/Head";
import Foot from "./layout/Foot";

function LoginPage() {
    return (
        <div>
            <Head/>
            <h1>Login Page</h1>
            {/* Google 로그인 버튼 */}
            <GoogleLoginButton/>

<<<<<<< HEAD
            {/* 로그아웃 버튼 */}
            <LogoutButton/>
            <Foot/>
=======
                {/* Google 로그인 버튼 */}
                <GoogleLoginButton />

                {/* 로그아웃 버튼 */}
                <LogoutButton />
            </div>
>>>>>>> origin/feature-jhr
        </div>
    );
}

export default LoginPage;
