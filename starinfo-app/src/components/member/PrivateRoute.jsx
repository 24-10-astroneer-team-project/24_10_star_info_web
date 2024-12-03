// PrivateRoute.jsx

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../services/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isAuthLoading } = useAuth();

    if (isAuthLoading) {
        // 로딩 중에는 빈 화면 또는 로딩 스피너를 표시
        return <div>로딩 중...</div>;
    }

    if (!isAuthenticated) {
        // 인증되지 않은 경우 로그인 페이지로 리다이렉트
        return <Navigate to="/react/login" />;
    }

    // 인증된 경우 보호된 컴포넌트를 렌더링
    return children;
};

export default PrivateRoute;
