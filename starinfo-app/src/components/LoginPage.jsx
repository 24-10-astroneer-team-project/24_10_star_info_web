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
>>>>>>> d80e1566534f4463b772354c317430220515fb47
        </div>
    );
}

export default LoginPage;
