import React from "react";
import LoginPage from "./components/LoginPage";
import AstroAnimation from "./components/AstroAnimation";

function App() {
    return (
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
            {/* PixiJS 애니메이션 */}
            <AstroAnimation />
            {/* 로그인 페이지 */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", zIndex: 1 }}>
                <LoginPage />
            </div>
        </div>
    );
}

export default App;