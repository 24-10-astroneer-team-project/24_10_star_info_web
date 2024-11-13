import React from 'react';

const LogoutButton = () => {
    const socialLogout = () => {
        console.log('%c[INFO] 로그아웃 시도 중...', 'color: blue');
        fetch('/api/member/logout', {
            method: 'POST',
        })
            .then(response => {
                if (response.ok) {
                    console.log('%c[INFO] 서버 로그아웃 성공', 'color: green');
                    window.location.href = "/api/member/login";  // 로그아웃 후 로그인 페이지로 리다이렉트
                } else {
                    console.error('%c[ERROR] 서버 로그아웃 실패:', 'color: red', response.status);
                }
            })
            .catch(error => {
                console.error('%c[ERROR] 로그아웃 중 에러 발생:', 'color: red', error);
            });
    };

    return (
        <button onClick={socialLogout}>
            로그아웃
        </button>
    );
};

export default LogoutButton;
