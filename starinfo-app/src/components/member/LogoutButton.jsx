import React from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";

const LogoutButton = () => {
    const navigate = useNavigate();

    const socialLogout = () => {
        console.log('%c[INFO] 로그아웃 시도 중...', 'color: blue');

        // 이전 로그인 상태를 표시하는 sessionStorage 삭제
        sessionStorage.removeItem("hasShownLoginSuccess");

        fetch('/api/member/logout', {
            method: 'POST',
        })
            .then(response => {
                if (response.ok) {
                    console.log('%c[INFO] 서버 로그아웃 성공', 'color: green');
                    setTimeout(() => {
                        // React Router로 상태를 전달하며 리다이렉트
                        navigate('/react/main', { state: { fromLogout: true } });
                    }, 100); // 100ms 대기
                } else {
                    console.error('%c[ERROR] 서버 로그아웃 실패:', 'color: red', response.status);
                    toast.error("로그아웃 요청이 실패했습니다. 다시 시도해주세요.", {
                        position: "top-center",
                        autoClose: 2000,
                    });
                }
            })
            .catch(error => {
                console.error('%c[ERROR] 로그아웃 중 에러 발생:', 'color: red', error);
                toast.error("알 수 없는 문제가 발생했습니다. 다시 시도해주세요.", {
                    position: "top-center",
                    autoClose: 2000,
                });
            });
    };

    return (
        <button onClick={socialLogout}>
            로그아웃
        </button>
    );
};

export default LogoutButton;
