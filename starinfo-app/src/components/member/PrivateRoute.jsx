// PrivateRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthProvider';
import RequireLogin from '../member/RequireLogin';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth(); // 로그인 여부 확인

    if (!isAuthenticated) {
        // 로그인되지 않은 경우 로그인 필요 페이지로 리디렉션
        return <RequireLogin />;
    }

    // 로그인된 경우, 요청한 페이지로 이동
    return children;
};

export default PrivateRoute;
