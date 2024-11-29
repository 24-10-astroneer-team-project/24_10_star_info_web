// RequireLogin.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AstroAnimation from '../../pixi/AstroAnimation'; // AstroAnimation 컴포넌트를 import

const RequireLogin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // 페이지 로드 시 토스트 메시지 표시
        toast.info('로그인이 필요합니다. 5초 후 로그인 페이지로 이동합니다.');

        // 5초 후 로그인 페이지로 리디렉션
        const timer = setTimeout(() => {
            navigate('/react/login');
        }, 5000);

        // 컴포넌트 언마운트 시 타이머 정리
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            overflow: 'hidden', // 스크롤바 제거
        }}>
            {/* AstroAnimation을 배경으로 설정 */}
            <AstroAnimation/>

            {/* 로그인 요청 메시지 */}
            <div style={{
                position: 'relative',
                zIndex: 1, // AstroAnimation보다 앞에 나오도록 설정
                color: 'white',
                width: "100%",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                textAlign: 'center',
                paddingTop: '20vh',
                fontSize: '24px',
            }}>
                <h2>로그인이 필요합니다</h2>
                <p>로그인 페이지로 이동 중입니다...</p>
            </div>
        </div>
    );
};

export default RequireLogin;
